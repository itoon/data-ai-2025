<template>
  <main
    class="container max-w-5xl px-4 xl:px-[103px] mx-auto gap-x-6 h-full pt-10 pb-4 flex flex-col"
  >
    <div
      class="px-4 py-6 bg-white rounded-3xl min-h-[75vh] md:py-20 md:px-20 md:min-h-0"
    >
      <NuxtImg src="/logo.png" class="mx-auto w-40" />
      <img
        :src="profileState.pictureUrl"
        class="mx-auto mt-4 mb-4 w-24 rounded-full"
      />
      <div class="mt-4 text-center">
        <h1 class="font-bold">
          สวัสดีนักผจญภัย {{ profileState.displayName }} !
        </h1>
        คุณได้รับเลือกให้เข้าร่วมทีมเพื่อออกค้นหาสมบัติในดินแดนลึกลับ
        <br class="hidden lg:block" />
        แต่ก่อนออกเดินทาง เราต้องรู้ก่อนว่าคุณมีพลังพิเศษอะไรที่จะช่วยทีมได้บ้าง
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
        class="flex gap-2 justify-center items-center mt-10 text-xs text-center lg:text-base"
      >
        <p>Powered by</p>
        <NuxtImg src="/spark-logo.png" class="w-20" />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
defineProps({
  profileState: {
    type: Object,
    required: true,
  },
});
</script>
