<template>
  <div>
    <UContainer class="w-full">
      <UPageGrid class="mt-12">
        <UPageCard
          title="遥感影像判读学习"
          description="掌握遥感图像处理与分析的核心技能"
          orientation="vertical"
        >
          <div class="flex flex-col h-full">
            <NuxtImg
              src="/images/study.jpeg"
              alt="遥感影像判读学习"
              class="w-full object-cover rounded-md"
            />

            <div class="mt-8">
              <UButton
                to="/learn"
                icon="i-lucide-book"
                trailing-icon="i-lucide-arrow-right"
                size="xl"
                class="w-full"
              >
                开始学习
              </UButton>
            </div>
          </div>
        </UPageCard>
        <UPageCard
          title="遥感影像判读训练"
          description="通过实际题目提升判读技能"
          orientation="vertical"
        >
          <div class="flex flex-col h-full">
            <NuxtImg
              src="/images/train.jpeg"
              alt="遥感影像判读训练"
              class="w-full object-cover rounded-md"
            />

            <div class="mt-8">
              <UButton
                to="/train"
                icon="i-lucide-target"
                trailing-icon="i-lucide-arrow-right"
                size="xl"
                class="w-full"
              >
                开始训练
              </UButton>
            </div>
          </div>
        </UPageCard>
      </UPageGrid>
    </UContainer>
  </div>
</template>
