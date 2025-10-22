<template>
  <div class="bg-main">
    <nav
      v-show="isStart"
      class="absolute w-full p-4 z-10 flex items-center justify-center md:justify-between gap-x-1 lg:gap-x-10 md:px-[120px] px-4 py-2 transition-all"
    >
      <div class="flex w-full max-w-5xl mx-auto gap-x-2 lg:px-2">
        <div class="flex-1 flex gap-2 py-[20px] md:px-20">
          <div class="w-full overflow-hidden bg-[#016789] rounded-full">
            <div
              class="h-2 transition-all bg-white rounded-full"
              :style="{
                width: `${
                  ((answerTypeQuestions + answerCharacterQuestions) /
                    totalQuestions) *
                  100
                }%`,
              }"
            ></div>
          </div>
        </div>
      </div>
    </nav>
    <div class="min-h-screen">
      <main
        v-if="!isStart"
        class="container max-w-5xl px-4 xl:px-[103px] mx-auto gap-x-6 h-full pt-10 pb-4 flex flex-col"
      >
        <div
          class="px-4 py-6 bg-white rounded-3xl min-h-[75vh] md:py-20 md:px-20 md:min-h-0"
        >
          <img src="/logo.png" class="w-40 mx-auto" />
          <img
            :src="profileState.pictureUrl"
            class="w-24 mx-auto mt-4 mb-4 rounded-full"
          />
          <div class="mt-4 text-center">
            <h1 class="font-bold">
              สวัสดีนักผจญภัย {{ profileState.displayName }} !
            </h1>
            คุณได้รับเลือกให้เข้าร่วมทีมเพื่อออกค้นหาสมบัติในดินแดนลึกลับ
            <br class="hidden lg:block" />
            แต่ก่อนออกเดินทาง
            เราต้องรู้ก่อนว่าคุณมีพลังพิเศษอะไรที่จะช่วยทีมได้บ้าง
            <br class="hidden lg:block" />มาค้นหาพลังที่ซ่อนอยู่ในตัวคุณกันเถอะ!
            <br class="lg:block" />
            <br class="lg:block" />
            <h2 class="font-bold">วิธีเล่น!</h2>
            อ่านแต่ละสถานการณ์แล้วเลือกคำตอบที่ตรงกับตัวคุณมากที่สุด<br
              class="hidden lg:block"
            />
            แต่ละคำตอบจะบ่งบอกถึงพลังพิเศษที่คุณมี!
          </div>
          <div
            class="flex items-center justify-center gap-2 mt-10 text-xs text-center lg:text-base"
          >
            <p>Powered by</p>
            <img src="/spark-logo.png" class="w-20" />
          </div>
        </div>
      </main>
      <main
        v-else
        class="container max-w-5xl px-4 xl:px-[103px] mx-auto gap-x-6 h-full pt-16 pb-4 flex flex-col md:pt-32"
      >
        <div
          class="px-4 py-6 bg-white rounded-3xl min-h-[75vh] md:py-20 md:px-20 md:min-h-0"
        >
          <div
            class="inline-flex flex-col w-full gap-2 h-fit col-span-full md:py-6 md:gap-4 md:flex md:justify-between lg:py-0"
          >
            <p class="text-lg font-bold text-center lg:text-3xl">
              {{ renderQuestion.question }}
            </p>
          </div>
          <div class="grid w-full grid-cols-12 gap-4 mx-auto mt-6 md:gap-6">
            <div
              class="col-span-12 md:col-span-12"
              v-for="(choice, index) in renderChoices"
              :key="index"
            >
              <button
                class="relative flex flex-col items-center w-full gap-2 px-4 py-3 text-sm transition-all rounded-lg cursor-pointer select-none blank border-choice lg:text-lg"
                @click="selected(choice)"
                :class="{ 'choice-selected': select === choice }"
              >
                <p>{{ choice.text }}</p>
              </button>
            </div>
          </div>
        </div>
      </main>
      <footer
        class="fixed bottom-0 w-full pb-10 bg-white lg:pb-0"
        v-show="!isStart"
      >
        <div class="container p-4 mx-auto md:flex md:justify-end">
          <button
            class="bg-black disabled:bg-[#b0bec5] rounded-lg text-white w-full z-10 text-center min-h-[40px] md:min-h-[59px] px-2 min-w-[100px] md:w-full md:max-w-[172px] md:min-w-[172px] md:!leading-[150%] md:!py-4 transition-all duration-75 disabled btn-primary md:!h-14 font-bold"
            :disabled="isLoading"
            @click="isStart = true"
          >
            เริ่มทดสอบ
          </button>
        </div>
      </footer>
      <footer
        class="fixed bottom-0 w-full pb-10 bg-white lg:pb-0"
        v-show="step == 1 && isStart"
      >
        <div class="container p-4 mx-auto md:flex md:justify-end">
          <button
            class="bg-black disabled:bg-[#b0bec5] rounded-lg text-white w-full z-10 text-center min-h-[40px] md:min-h-[59px] px-2 min-w-[100px] md:w-full md:max-w-[172px] md:min-w-[172px] md:!leading-[150%] md:!py-4 transition-all duration-75 disabled btn-primary md:!h-14 font-bold"
            :disabled="select === null"
            @click="submit1Step"
          >
            ต่อไป
          </button>
        </div>
      </footer>
      <footer
        class="fixed bottom-0 w-full pb-5 bg-white lg:pb-0"
        v-show="step == 2 && isStart"
      >
        <div class="container p-4 mx-auto md:flex md:justify-end">
          <button
            class="bg-black disabled:bg-[#b0bec5] rounded-lg text-white w-full z-10 text-center min-h-[40px] md:min-h-[59px] px-2 min-w-[100px] md:w-full md:max-w-[172px] md:min-w-[172px] md:!leading-[150%] md:!py-4 transition-all duration-75 disabled btn-primary md:!h-14 font-bold"
            :disabled="select === null"
            @click="submit2Step"
          >
            ต่อไป
          </button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import liff from "@line/liff";
const profileState = ref({
  userId: "",
  pictureUrl: "",
  displayName: "",
});
const isLoading = ref(true);
const isStart = ref(false);
onMounted(async () => {
  liff.init({ liffId: "2006228745-Kv8mAomW" });
  liff.ready.then(() => {
    if (liff.isLoggedIn()) {
      liff.getProfile().then(async (profile) => {
        profileState.value = profile;
      });
      isLoading.value = false;
    } else {
      liff.login();
    }
  });
});

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

const select = ref<{
  text: string;
  value: TypeAnswer;
} | null>(null);
const step = ref(1);
const index = ref(0);
import typeQuestions from "~/data/type.json";
import characterQuestions from "~/data/character.json";
// order typeQuestion from type.json
const questions = ref(typeQuestions.sort(() => Math.random() - 0.5));
// const questions =
const renderQuestion = computed(() => questions.value[index.value]);
const renderChoices = computed(() => {
  const answers = [...renderQuestion.value.answers];
  return answers.sort(() => Math.random() - 0.5);
  // return renderQuestion.value.answers;
});

const selected = (choice: { text: string; value: TypeAnswer }) => {
  select.value = choice;
};

const totalQuestions = 8;
const answerTypeQuestions = ref(0);
const answerCharacterQuestions = ref(0);

const typeAnswers = ref({
  Action: 0,
  People: 0,
  Thought: 0,
});

const submit1Step = () => {
  if (
    select.value?.value == "Action" ||
    select.value?.value == "People" ||
    select.value?.value == "Thought"
  ) {
    typeAnswers.value[select.value.value] += 1;
    if (typeAnswers.value[select.value.value] >= 2) {
      step.value = 2;
      questions.value = characterQuestions[select.value.value].sort(
        () => Math.random() - 0.5
      );
      index.value = 0;
      answerTypeQuestions.value = 4;
    } else {
      index.value++;
      answerTypeQuestions.value++;
    }
    select.value = null;
  }
};

const characterAnswers = ref({
  "The Dynamo": 0,
  "The Doer": 0,
  "The Perfectionist": 0,
  "The Maestro": 0,
  "The Harmonizer": 0,
  "The Networker": 0,
  "The Imagineer": 0,
  "The Oracle": 0,
  "The Sage": 0,
});

const router = useRouter();

const submit2Step = () => {
  console.log(select.value.value);
  if (
    select.value?.value == "The Dynamo" ||
    select.value?.value == "The Doer" ||
    select.value?.value == "The Perfectionist" ||
    select.value?.value == "The Maestro" ||
    select.value?.value == "The Harmonizer" ||
    select.value?.value == "The Networker" ||
    select.value?.value == "The Imagineer" ||
    select.value?.value == "The Oracle" ||
    select.value?.value == "The Sage"
  ) {
    characterAnswers.value[select.value.value] += 1;
    if (characterAnswers.value[select.value.value] >= 2) {
      answerCharacterQuestions.value = 4;
      router.push("/result?type=" + select.value.value);
    } else {
      index.value++;
      answerCharacterQuestions.value++;
    }
    select.value = null;
  }
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
