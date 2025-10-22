<template>
  <div class="bg-main">
    <nav
      v-show="isStart"
      class="absolute w-full p-4 z-10 flex items-center justify-center md:justify-between gap-x-1 lg:gap-x-10 md:px-[120px] px-4 py-2 transition-all"
    >
      <div class="flex gap-x-2 mx-auto w-full max-w-5xl lg:px-2">
        <div class="flex-1 flex gap-2 py-[20px] md:px-20">
          <div class="w-full overflow-hidden bg-[#016789] rounded-full">
            <div
              class="h-2 bg-white rounded-full transition-all"
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
      <Landing v-if="!isStart" :profileState="profileState" />
      <main
        v-else
        class="container max-w-5xl px-4 xl:px-[103px] mx-auto gap-x-6 h-full pt-16 pb-4 flex flex-col md:pt-32"
      >
        <div
          class="px-4 py-6 bg-white rounded-3xl min-h-[75vh] md:py-10 md:px-20 md:min-h-0"
        >
          <div
            class="inline-flex flex-col col-span-full gap-2 w-full h-fit md:py-6 md:gap-4 md:flex md:justify-between lg:py-0"
          >
            <p class="text-lg font-bold text-center lg:text-3xl">
              {{ renderQuestion.question }}
            </p>
          </div>
          <div class="grid grid-cols-12 gap-4 mx-auto mt-6 w-full md:gap-6">
            <div
              class="col-span-12 md:col-span-12"
              v-for="(choice, index) in renderChoices"
              :key="index"
            >
              <button
                class="flex relative flex-col gap-2 items-center px-4 py-3 w-full text-sm rounded-lg transition-all cursor-pointer select-none blank border-choice lg:text-lg"
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
        class="fixed bottom-0 pb-10 w-full bg-white lg:pb-0"
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
        class="fixed bottom-0 pb-10 w-full bg-white lg:pb-0"
        v-show="isStart"
      >
        <div class="container p-4 mx-auto md:flex md:justify-end">
          <button
            class="bg-black disabled:bg-[#b0bec5] rounded-lg text-white w-full z-10 text-center min-h-[40px] md:min-h-[59px] px-2 min-w-[100px] md:w-full md:max-w-[172px] md:min-w-[172px] md:!leading-[150%] md:!py-4 transition-all duration-75 disabled btn-primary md:!h-14 font-bold"
            :disabled="select === null"
            @click="submitStep"
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

const characterAnswers = ref({
  I: 0,
  E: 0,
  D: 0,
  F: 0,
  C: 0,
});
onMounted(async () => {
  const config = useRuntimeConfig();
  liff.init({ liffId: config.public.lineLiffId });
  liff.ready.then(() => {
    if (liff.isLoggedIn()) {
      liff.getProfile().then(async (profile) => {
        profileState.value = {
          userId: profile.userId,
          pictureUrl: profile.pictureUrl || "",
          displayName: profile.displayName || "",
        };
      });
      isLoading.value = false;
    } else {
      liff.login();
    }
  });
});

const select = ref<{
  text: string;
  value: string;
} | null>(null);
const index = ref(0);
import typeQuestions from "~/data/question.json";

// order typeQuestion from type.json
const questions = ref(typeQuestions.sort(() => Math.random() - 0.5));
const renderQuestion = computed(() => questions.value[index.value]);
const renderChoices = computed(() => {
  const answers = [...renderQuestion.value.answers];
  return answers.sort(() => Math.random() - 0.5);
});

const selected = (choice: { text: string; value: string }) => {
  select.value = choice;
};

const totalQuestions = typeQuestions.length;
const answerTypeQuestions = ref(0);
const answerCharacterQuestions = ref(0);
const router = useRouter();

const submitStep = () => {
  characterAnswers.value[
    select.value?.value as keyof typeof characterAnswers.value
  ] += 1;
  answerTypeQuestions.value++;
  index.value++;
  select.value = null;
  console.log(characterAnswers.value);
  if (answerTypeQuestions.value >= totalQuestions) {
    // find max value
    const mappingName = {
      I: "The Anomaly Finder",
      E: "The Risk Assessor",
      D: "The Vanguard",
      F: "The Integrity Guardian",
      C: "The Nexus",
    };
    const maxValue = Math.max(...Object.values(characterAnswers.value));
    const maxKey = Object.keys(characterAnswers.value).find(
      (key) =>
        characterAnswers.value[key as keyof typeof characterAnswers.value] ===
        maxValue
    );

    router.push(
      "/result?type=" + mappingName[maxKey as keyof typeof mappingName]
    );
  }
};
</script>

<style lang="css" scoped>
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
