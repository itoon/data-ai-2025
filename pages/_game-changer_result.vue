<template>
  <div class="bg-main">
    <div class="min-h-screen">
      <main
        class="container max-w-xl px-4 xl:px-[103px] mx-auto gap-x-6 h-full pt-5 pb-4 flex flex-col lg:pt-10"
      >
        <div class="px-4 py-6 bg-white rounded-3xl min-h-[75vh] relative">
          <div
            class="flex flex-col justify-between gap-2 col-span-full md:col-start-4 md:col-end-10 md:py-6"
          >
            <div class="text-lg font-bold text-center md:text-xl">
              ตัวละครของ {{ profileState.displayName }} คือ..
            </div>
            <div class="w-[90%] lg:w-64 my-4 relative text-center mx-auto">
              <img
                v-if="character.image"
                :src="character.image"
                class="mx-auto rounded-2xl"
              />
            </div>
            <p class="font-bold text-center">{{ type }}</p>
            <p class="text-center">{{ character.text }}</p>
          </div>
        </div>
      </main>
      <footer class="fixed bottom-0 w-full pb-5 bg-white lg:pb-0">
        <div class="container p-4 mx-auto md:flex md:justify-end">
          <button
            class="bg-black disabled:bg-[#b0bec5] rounded-lg text-white w-full z-10 text-center min-h-[40px] md:min-h-[59px] px-2 min-w-[100px] md:w-full md:max-w-[172px] md:min-w-[172px] md:!leading-[150%] md:!py-4 transition-all duration-75 disabled btn-primary md:!h-14 font-bold lg:hidden"
            @click="sendMessage"
          >
            Send to Line
          </button>
          <a
            class="bg-black disabled:bg-[#b0bec5] rounded-lg text-white w-full z-10 text-center min-h-[40px] md:min-h-[59px] px-2 min-w-[100px] md:w-full md:max-w-[172px] md:min-w-[172px] md:!leading-[150%] md:!py-4 transition-all duration-75 disabled btn-primary md:!h-14 font-bold hidden lg:block"
            :href="character.image"
            :download="character.image"
          >
            Save Character
          </a>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { collection, addDoc } from "firebase/firestore";
const nuxtApp = useNuxtApp();
const db = nuxtApp.$db;

import liff from "@line/liff";
import result from "~/data/result.json";
const loading = ref(true);
const route = useRoute();
type TypeAnswer =
  | "Action"
  | "People"
  | "Thought"
  | "The Dynamo"
  | "The Doer"
  | "The Perfectionist"
  | "The Maestro"
  | "The Harmonizer"
  | "The Networker"
  | "The Imagineer"
  | "The Oracle"
  | "The Sage";
const type = route.query.type as TypeAnswer;
const character = result[type];

const profileState = ref({
  userId: "",
  pictureUrl: "",
  displayName: "",
});
setTimeout(() => {
  loading.value = false;
}, 1000);

onMounted(async () => {
  liff.init({ liffId: "2006228745-Kv8mAomW" });
  liff.ready.then(() => {
    if (liff.isLoggedIn()) {
      liff.getProfile().then(async (profile) => {
        profileState.value = profile;
        try {
          const docRef = await addDoc(collection(db, "users"), {
            ...profile,
            type: type,
          });
        } catch (error) {
          console.log(error);
        }
      });
    } else {
      liff.login();
    }
  });
});

const sendMessage = () => {
  const image =
    "https://itoon.github.io/game-changer/" + encodeURI(character.image);
  liff
    .sendMessages([
      {
        type: "text",
        text: type + "\n" + character.text,
      },
      {
        type: "image",
        originalContentUrl: image,
        previewImageUrl: image,
      },
    ])
    .then(() => {
      liff.closeWindow();
    })
    .catch((err) => {
      alert(err);
    });
};
</script>

<style lang="css" scoped>
.bg-main {
  background: linear-gradient(168.63deg, #4bb5e6 2.44%, #19c768 98.03%);
}
.border-choice {
  border: 2px solid var(--linear, #4bb5e6);
}
.choice-selected {
  background: linear-gradient(
    169deg,
    rgba(75, 181, 230, 0.4) 2.44%,
    rgba(25, 199, 104, 0.4) 98.03%
  );
}
</style>
