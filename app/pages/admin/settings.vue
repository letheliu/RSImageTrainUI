<template>
  <div class="p-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-2">
        系统设置
      </h1>
      <p class="text-gray-600">
        管理系统的基础配置和参数
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- 左侧：设置导航 -->
      <div class="lg:col-span-1">
        <UCard class="sticky top-8">
          <nav class="space-y-1">
            <button
              v-for="tab in tabs"
              :key="tab.key"
              class="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left"
              :class="activeTab === tab.key ? 'bg-primary-100 text-primary-700' : 'text-gray-700 hover:bg-gray-100'"
              @click="activeTab = tab.key"
            >
              <UIcon
                :name="tab.icon"
                class="text-xl"
              />
              <span class="font-medium">{{ tab.label }}</span>
            </button>
          </nav>
        </UCard>
      </div>

      <!-- 右侧：设置内容 -->
      <div class="lg:col-span-3">
        <!-- 基本信息 -->
        <div
          v-show="activeTab === 'basic'"
          class="space-y-6"
        >
          <UCard>
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon
                  name="heroicons:information-circle"
                  class="text-xl text-primary-500"
                />
                <h2 class="text-lg font-semibold">
                  基本信息
                </h2>
              </div>
            </template>

            <UForm
              class="space-y-6"
              @submit="saveBasicSettings"
            >
              <UFormField
                label="网站名称"
                name="siteName"
              >
                <UInput
                  v-model="settings.basic.siteName"
                  placeholder="遥影智训"
                  size="xl"
                  class="w-full"
                />
              </UFormField>

              <UFormField
                label="网站描述"
                name="siteDescription"
              >
                <UTextarea
                  v-model="settings.basic.siteDescription"
                  placeholder="卫星影像判读训练平台"
                  :rows="3"
                  size="xl"
                  class="w-full"
                />
              </UFormField>

              <UFormField
                label="网站关键词"
                name="siteKeywords"
              >
                <UInput
                  v-model="settings.basic.siteKeywords"
                  placeholder="遥感,影像判读,训练平台"
                  size="xl"
                  class="w-full"
                />
              </UFormField>

              <UFormField
                label="联系邮箱"
                name="contactEmail"
              >
                <UInput
                  v-model="settings.basic.contactEmail"
                  placeholder="contact@example.com"
                  type="email"
                  size="xl"
                  class="w-full"
                />
              </UFormField>

              <UFormField
                label="联系电话"
                name="contactPhone"
              >
                <UInput
                  v-model="settings.basic.contactPhone"
                  placeholder="18810000000"
                  size="xl"
                  class="w-full"
                />
              </UFormField>

              <UFormField
                label="备案号"
                name="icp"
              >
                <UInput
                  v-model="settings.basic.icp"
                  placeholder="京ICP备xxxxxxxx号"
                  size="xl"
                  class="w-full"
                />
              </UFormField>

              <div class="flex gap-3 pt-4 border-t border-gray-200">
                <UButton
                  type="submit"
                  color="primary"
                  size="md"
                  :loading="saving"
                >
                  <UIcon
                    name="heroicons:check-circle"
                    class="mr-2"
                  />
                  保存设置
                </UButton>
              </div>
            </UForm>
          </UCard>
        </div>

        <!-- 系统参数 -->
        <div
          v-show="activeTab === 'system'"
          class="space-y-6"
        >
          <UCard>
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon
                  name="heroicons:cog-6-tooth"
                  class="text-xl text-primary-500"
                />
                <h2 class="text-lg font-semibold">
                  系统参数
                </h2>
              </div>
            </template>

            <UForm
              class="space-y-6"
              @submit="saveSystemSettings"
            >
              <UFormField
                label="用户默认头像"
                name="defaultAvatar"
              >
                <UInput
                  v-model="settings.system.defaultAvatar"
                  placeholder="/images/default-avatar.png"
                  size="xl"
                  class="w-full"
                />
              </UFormField>

              <UFormField
                label="单页显示数量"
                name="pageSize"
              >
                <USelect
                  v-model="settings.system.pageSize"
                  :options="pageSizeOptions"
                  size="xl"
                  class="w-full"
                />
              </UFormField>

              <UFormField
                label="允许注册"
                name="allowRegister"
              >
                <div class="flex items-center gap-3">
                  <UToggle v-model="settings.system.allowRegister" />
                  <span class="text-sm text-gray-600">
                    开启后用户可以自行注册账号
                  </span>
                </div>
              </UFormField>

              <UFormField
                label="需要审核"
                name="requireApproval"
              >
                <div class="flex items-center gap-3">
                  <UToggle v-model="settings.system.requireApproval" />
                  <span class="text-sm text-gray-600">
                    新注册用户需要管理员审核后才能使用
                  </span>
                </div>
              </UFormField>

              <UFormField
                label="启用验证码"
                name="enableCaptcha"
              >
                <div class="flex items-center gap-3">
                  <UToggle v-model="settings.system.enableCaptcha" />
                  <span class="text-sm text-gray-600">
                    登录和注册时启用图形验证码
                  </span>
                </div>
              </UFormField>

              <UFormField
                label="会话超时时间（分钟）"
                name="sessionTimeout"
              >
                <UInput
                  v-model.number="settings.system.sessionTimeout"
                  type="number"
                  size="xl"
                  class="w-full"
                />
              </UFormField>

              <div class="flex gap-3 pt-4 border-t border-gray-200">
                <UButton
                  type="submit"
                  color="primary"
                  size="md"
                  :loading="saving"
                >
                  <UIcon
                    name="heroicons:check-circle"
                    class="mr-2"
                  />
                  保存设置
                </UButton>
              </div>
            </UForm>
          </UCard>
        </div>

        <!-- 邮件设置 -->
        <div
          v-show="activeTab === 'email'"
          class="space-y-6"
        >
          <UCard>
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon
                  name="heroicons:envelope"
                  class="text-xl text-primary-500"
                />
                <h2 class="text-lg font-semibold">
                  邮件设置
                </h2>
              </div>
            </template>

            <UForm
              class="space-y-6"
              @submit="saveEmailSettings"
            >
              <UFormField
                label="SMTP服务器"
                name="smtpHost"
              >
                <UInput
                  v-model="settings.email.smtpHost"
                  placeholder="smtp.example.com"
                  size="xl"
                  class="w-full"
                />
              </UFormField>

              <UFormField
                label="SMTP端口"
                name="smtpPort"
              >
                <UInput
                  v-model.number="settings.email.smtpPort"
                  type="number"
                  placeholder="587"
                  size="xl"
                  class="w-full"
                />
              </UFormField>

              <UFormField
                label="发件人邮箱"
                name="fromEmail"
              >
                <UInput
                  v-model="settings.email.fromEmail"
                  placeholder="noreply@example.com"
                  type="email"
                  size="xl"
                  class="w-full"
                />
              </UFormField>

              <UFormField
                label="发件人名称"
                name="fromName"
              >
                <UInput
                  v-model="settings.email.fromName"
                  placeholder="遥影智训"
                  size="xl"
                  class="w-full"
                />
              </UFormField>

              <UFormField
                label="邮箱用户名"
                name="username"
              >
                <UInput
                  v-model="settings.email.username"
                  placeholder="user@example.com"
                  size="xl"
                  class="w-full"
                />
              </UFormField>

              <UFormField
                label="邮箱密码/授权码"
                name="password"
              >
                <UInput
                  v-model="settings.email.password"
                  type="password"
                  placeholder="••••••••"
                  size="xl"
                  class="w-full"
                />
              </UFormField>

              <UFormField
                label="启用SSL/TLS"
                name="useSsl"
              >
                <div class="flex items-center gap-3">
                  <UToggle v-model="settings.email.useSsl" />
                  <span class="text-sm text-gray-600">
                    使用SSL加密连接
                  </span>
                </div>
              </UFormField>

              <div class="flex gap-3 pt-4 border-t border-gray-200">
                <UButton
                  type="submit"
                  color="primary"
                  size="md"
                  :loading="saving"
                >
                  <UIcon
                    name="heroicons:check-circle"
                    class="mr-2"
                  />
                  保存设置
                </UButton>
                <UButton
                  color="neutral"
                  variant="outline"
                  size="md"
                  @click="testEmail"
                >
                  <UIcon
                    name="heroicons:paper-airplane"
                    class="mr-2"
                  />
                  发送测试邮件
                </UButton>
              </div>
            </UForm>
          </UCard>
        </div>

        <!-- 存储设置 -->
        <div
          v-show="activeTab === 'storage'"
          class="space-y-6"
        >
          <UCard>
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon
                  name="heroicons:server"
                  class="text-xl text-primary-500"
                />
                <h2 class="text-lg font-semibold">
                  存储设置
                </h2>
              </div>
            </template>

            <UForm
              class="space-y-6"
              @submit="saveStorageSettings"
            >
              <UFormField
                label="存储方式"
                name="storageType"
              >
                <USelect
                  v-model="settings.storage.storageType"
                  :options="storageTypeOptions"
                  size="xl"
                  class="w-full"
                />
              </UFormField>

              <div
                v-if="settings.storage.storageType === 'local'"
                class="space-y-4"
              >
                <UFormField
                  label="上传路径"
                  name="uploadPath"
                >
                  <UInput
                    v-model="settings.storage.uploadPath"
                    placeholder="/uploads"
                    size="xl"
                    class="w-full"
                  />
                </UFormField>

                <UFormField
                  label="最大文件大小（MB）"
                  name="maxFileSize"
                >
                  <UInput
                    v-model.number="settings.storage.maxFileSize"
                    type="number"
                    size="xl"
                    class="w-full"
                  />
                </UFormField>
              </div>

              <div
                v-if="settings.storage.storageType === 'oss'"
                class="space-y-4"
              >
                <UFormField
                  label="OSS服务商"
                  name="ossProvider"
                >
                  <USelect
                    v-model="settings.storage.ossProvider"
                    :options="ossProviderOptions"
                    size="xl"
                    class="w-full"
                  />
                </UFormField>

                <UFormField
                  label="Access Key ID"
                  name="accessKeyId"
                >
                  <UInput
                    v-model="settings.storage.accessKeyId"
                    placeholder="您的AccessKey ID"
                    size="xl"
                    class="w-full"
                  />
                </UFormField>

                <UFormField
                  label="Access Key Secret"
                  name="accessKeySecret"
                >
                  <UInput
                    v-model="settings.storage.accessKeySecret"
                    type="password"
                    placeholder="您的AccessKey Secret"
                    size="xl"
                    class="w-full"
                  />
                </UFormField>

                <UFormField
                  label="Bucket名称"
                  name="bucket"
                >
                  <UInput
                    v-model="settings.storage.bucket"
                    placeholder="my-bucket"
                    size="xl"
                    class="w-full"
                  />
                </UFormField>

                <UFormField
                  label="区域/Endpoint"
                  name="region"
                >
                  <UInput
                    v-model="settings.storage.region"
                    placeholder="oss-cn-hangzhou"
                    size="xl"
                    class="w-full"
                  />
                </UFormField>
              </div>

              <UFormField
                label="允许的文件类型"
                name="allowedTypes"
              >
                <UTextarea
                  v-model="settings.storage.allowedTypes"
                  placeholder="jpg,jpeg,png,gif,pdf,doc,docx"
                  :rows="2"
                  size="xl"
                  class="w-full"
                />
                <p class="text-xs text-gray-500 mt-2">
                  多个类型用英文逗号分隔，不填则允许所有类型
                </p>
              </UFormField>

              <div class="flex gap-3 pt-4 border-t border-gray-200">
                <UButton
                  type="submit"
                  color="primary"
                  size="md"
                  :loading="saving"
                >
                  <UIcon
                    name="heroicons:check-circle"
                    class="mr-2"
                  />
                  保存设置
                </UButton>
              </div>
            </UForm>
          </UCard>
        </div>

        <!-- 安全设置 -->
        <div
          v-show="activeTab === 'security'"
          class="space-y-6"
        >
          <UCard>
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon
                  name="heroicons:shield-check"
                  class="text-xl text-primary-500"
                />
                <h2 class="text-lg font-semibold">
                  安全设置
                </h2>
              </div>
            </template>

            <UForm
              class="space-y-6"
              @submit="saveSecuritySettings"
            >
              <UFormField
                label="密码强度要求"
                name="passwordStrength"
              >
                <USelect
                  v-model="settings.security.passwordStrength"
                  :options="passwordStrengthOptions"
                  size="xl"
                  class="w-full"
                />
              </UFormField>

              <UFormField
                label="密码最小长度"
                name="minPasswordLength"
              >
                <UInput
                  v-model.number="settings.security.minPasswordLength"
                  type="number"
                  size="xl"
                  class="w-full"
                />
              </UFormField>

              <UFormField
                label="登录失败限制次数"
                name="maxLoginAttempts"
              >
                <UInput
                  v-model.number="settings.security.maxLoginAttempts"
                  type="number"
                  size="xl"
                  class="w-full"
                />
                <p class="text-xs text-gray-500 mt-2">
                  超过此次数将锁定账户
                </p>
              </UFormField>

              <UFormField
                label="锁定时间（分钟）"
                name="lockoutDuration"
              >
                <UInput
                  v-model.number="settings.security.lockoutDuration"
                  type="number"
                  size="xl"
                  class="w-full"
                />
              </UFormField>

              <UFormField
                label="启用两步验证"
                name="enableTwoFactor"
              >
                <div class="flex items-center gap-3">
                  <UToggle v-model="settings.security.enableTwoFactor" />
                  <span class="text-sm text-gray-600">
                    允许用户启用两步验证功能
                  </span>
                </div>
              </UFormField>

              <UFormField
                label="IP白名单"
                name="ipWhitelist"
              >
                <UTextarea
                  v-model="settings.security.ipWhitelist"
                  placeholder="192.168.1.1, 192.168.1.2"
                  :rows="3"
                  size="xl"
                  class="w-full"
                />
                <p class="text-xs text-gray-500 mt-2">
                  多个IP用英文逗号分隔，留空则不限制
                </p>
              </UFormField>

              <div class="flex gap-3 pt-4 border-t border-gray-200">
                <UButton
                  type="submit"
                  color="primary"
                  size="md"
                  :loading="saving"
                >
                  <UIcon
                    name="heroicons:check-circle"
                    class="mr-2"
                  />
                  保存设置
                </UButton>
              </div>
            </UForm>
          </UCard>
        </div>

        <!-- 字典管理 -->
        <div
          v-show="activeTab === 'dictionary'"
          class="space-y-6"
        >
          <UCard>
            <template #header>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <UIcon
                    name="heroicons:book-open"
                    class="text-xl text-primary-500"
                  />
                  <h2 class="text-lg font-semibold">
                    字典管理
                  </h2>
                </div>
                <UButton
                  size="md"
                  color="primary"
                  variant="soft"
                  @click="openDictTypeModal()"
                >
                  <UIcon
                    name="heroicons:plus"
                    class="mr-2"
                  />
                  添加字典类型
                </UButton>
              </div>
            </template>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <!-- 左侧：字典类型列表 -->
              <div>
                <h3 class="text-md font-semibold mb-4 text-gray-700">
                  字典类型
                </h3>
                <div
                  v-if="dictTypes.length === 0"
                  class="text-center py-8 text-gray-500"
                >
                  暂无字典类型
                </div>
                <div
                  v-else
                  class="space-y-2"
                >
                  <div
                    v-for="dictType in dictTypes"
                    :key="dictType.id"
                    class="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    :class="selectedDictType?.id === dictType.id ? 'border-primary-500 bg-primary-50' : 'border-gray-200'"
                    @click="selectDictType(dictType)"
                  >
                    <div class="flex-1">
                      <p class="font-medium text-gray-900">
                        {{ dictType.name }}
                      </p>
                      <p class="text-sm text-gray-500">
                        {{ dictType.code }}
                      </p>
                    </div>
                    <div class="flex items-center gap-1">
                      <UButton
                        icon="heroicons:pencil"
                        size="sm"
                        color="neutral"
                        variant="ghost"
                        @click.stop="openDictTypeModal(dictType)"
                      />
                      <UButton
                        icon="heroicons:trash"
                        size="sm"
                        color="error"
                        variant="ghost"
                        @click.stop="deleteDictType(dictType.id)"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <!-- 右侧：字典数据列表 -->
              <div>
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-md font-semibold text-gray-700">
                    {{ selectedDictType ? `${selectedDictType.name}数据` : '字典数据' }}
                  </h3>
                  <UButton
                    v-if="selectedDictType"
                    size="sm"
                    color="primary"
                    variant="soft"
                    @click="openDictDataModal()"
                  >
                    <UIcon
                      name="heroicons:plus"
                      class="mr-1"
                    />
                    添加数据
                  </UButton>
                </div>

                <div
                  v-if="!selectedDictType"
                  class="text-center py-8 text-gray-500"
                >
                  请先选择字典类型
                </div>

                <div
                  v-else-if="dictDataList.length === 0"
                  class="text-center py-8 text-gray-500"
                >
                  该字典类型暂无数据
                </div>

                <div
                  v-else
                  class="space-y-2"
                >
                  <div
                    v-for="data in dictDataList"
                    :key="data.id"
                    class="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div class="flex-1">
                      <p class="font-medium text-gray-900">
                        {{ data.label }}
                      </p>
                      <p class="text-sm text-gray-500">
                        值: {{ data.value }}
                      </p>
                    </div>
                    <div class="flex items-center gap-1">
                      <UButton
                        icon="heroicons:pencil"
                        size="sm"
                        color="neutral"
                        variant="ghost"
                        @click="openDictDataModal(data)"
                      />
                      <UButton
                        icon="heroicons:trash"
                        size="sm"
                        color="error"
                        variant="ghost"
                        @click="deleteDictData(data.id)"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </div>

    <!-- 字典类型弹窗 -->
    <UModal v-model:open="showDictTypeModal">
      <template #content>
        <UCard>
          <template #header>
            <h3 class="text-lg font-semibold">
              {{ editingDictType ? '编辑字典类型' : '添加字典类型' }}
            </h3>
          </template>

          <UForm
            class="space-y-4"
            @submit="saveDictType"
          >
            <UFormField
              label="字典名称"
              name="name"
            >
              <UInput
                v-model="dictTypeForm.name"
                placeholder="如：性别、学历等"
                size="xl"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="字典编码"
              name="code"
            >
              <UInput
                v-model="dictTypeForm.code"
                placeholder="如：gender、education等"
                size="xl"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="排序"
              name="sort"
            >
              <UInput
                v-model.number="dictTypeForm.sort"
                type="number"
                placeholder="数字越小越靠前"
                size="xl"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="备注"
              name="remark"
            >
              <UTextarea
                v-model="dictTypeForm.remark"
                placeholder="字典类型说明"
                :rows="2"
                size="xl"
                class="w-full"
              />
            </UFormField>

            <div class="flex gap-3 pt-4">
              <UButton
                type="submit"
                color="primary"
                size="md"
                :loading="saving"
              >
                保存
              </UButton>
              <UButton
                color="neutral"
                variant="outline"
                size="md"
                @click="showDictTypeModal = false"
              >
                取消
              </UButton>
            </div>
          </UForm>
        </UCard>
      </template>
    </UModal>

    <!-- 字典数据弹窗 -->
    <UModal v-model:open="showDictDataModal">
      <template #content>
        <UCard>
          <template #header>
            <h3 class="text-lg font-semibold">
              {{ editingDictData ? '编辑字典数据' : '添加字典数据' }}
            </h3>
          </template>

          <UForm
            class="space-y-4"
            @submit="saveDictData"
          >
            <UFormField
              label="显示标签"
              name="label"
            >
              <UInput
                v-model="dictDataForm.label"
                placeholder="如：男、女等"
                size="xl"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="数据值"
              name="value"
            >
              <UInput
                v-model="dictDataForm.value"
                placeholder="如：1、2等"
                size="xl"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="排序"
              name="sort"
            >
              <UInput
                v-model.number="dictDataForm.sort"
                type="number"
                placeholder="数字越小越靠前"
                size="xl"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="状态"
              name="status"
            >
              <USelect
                v-model="dictDataForm.status"
                :options="[
                  { label: '启用', value: 1 },
                  { label: '禁用', value: 0 }
                ]"
                size="xl"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="备注"
              name="remark"
            >
              <UTextarea
                v-model="dictDataForm.remark"
                placeholder="字典数据说明"
                :rows="2"
                size="xl"
                class="w-full"
              />
            </UFormField>

            <div class="flex gap-3 pt-4">
              <UButton
                type="submit"
                color="primary"
                size="md"
                :loading="saving"
              >
                保存
              </UButton>
              <UButton
                color="neutral"
                variant="outline"
                size="md"
                @click="showDictDataModal = false"
              >
                取消
              </UButton>
            </div>
          </UForm>
        </UCard>
      </template>
    </UModal>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

// 设置选项卡
const tabs = [
  { key: 'basic', label: '基本信息', icon: 'heroicons:information-circle' },
  { key: 'system', label: '系统参数', icon: 'heroicons:cog-6-tooth' },
  { key: 'email', label: '邮件设置', icon: 'heroicons:envelope' },
  { key: 'storage', label: '存储设置', icon: 'heroicons:server' },
  { key: 'security', label: '安全设置', icon: 'heroicons:shield-check' },
  { key: 'dictionary', label: '字典管理', icon: 'heroicons:book-open' }
]

const activeTab = ref('basic')
const saving = ref(false)

const api = useApi()

interface Settings {
  basic: {
    siteName?: string
    siteDescription?: string
    siteKeywords?: string
    contactEmail?: string
    contactPhone?: string
    icp?: string
  }

  system: {
    defaultAvatar?: string
    pageSize?: number
    allowRegister?: boolean
    requireApproval?: boolean
    enableCaptcha?: boolean
    sessionTimeout?: number
  }

  email: {
    smtpHost: string
    smtpPort: number
    fromEmail: string
    fromName: string
    username: string
    password: string
    useSsl: boolean
  }

  storage: {
    storageType?: string
    uploadPath?: string
    maxFileSize?: number
    ossProvider?: string
    accessKeyId?: string
    accessKeySecret?: string
    bucket?: string
    region?: string
    allowedTypes?: string
  }

  security: {
    passwordStrength?: string
    minPasswordLength?: number
    maxLoginAttempts?: number
    lockoutDuration?: number
    enableTwoFactor?: boolean
    ipWhitelist?: string
  }
}

interface DictType {
  id: string
  name?: string
  code?: string
  sort?: number
  remark?: string
}

interface DictData {
  id: string
  dictTypeId?: string
  label?: string
  value?: string
  sort?: number
  status?: number
  remark?: string
}

// 设置数据
const settings = ref<Settings>({
  basic: {
    siteName: '遥影智训',
    siteDescription: '卫星影像判读训练平台',
    siteKeywords: '遥感,影像判读,训练平台',
    contactEmail: 'contact@example.com',
    contactPhone: '18810000000',
    icp: '京ICP备xxxxxxxx号'
  },
  system: {
    defaultAvatar: '/images/default-avatar.png',
    pageSize: 20,
    allowRegister: true,
    requireApproval: false,
    enableCaptcha: true,
    sessionTimeout: 120
  },
  email: {
    smtpHost: '',
    smtpPort: 587,
    fromEmail: '',
    fromName: '遥影智训',
    username: '',
    password: '',
    useSsl: true
  },
  storage: {
    storageType: 'local',
    uploadPath: '/uploads',
    maxFileSize: 10,
    ossProvider: 'aliyun',
    accessKeyId: '',
    accessKeySecret: '',
    bucket: '',
    region: '',
    allowedTypes: 'jpg,jpeg,png,gif,pdf,doc,docx'
  },
  security: {
    passwordStrength: 'medium',
    minPasswordLength: 8,
    maxLoginAttempts: 5,
    lockoutDuration: 30,
    enableTwoFactor: false,
    ipWhitelist: ''
  }
})

// 选项数据
const pageSizeOptions = [
  { label: '10条/页', value: 10 },
  { label: '20条/页', value: 20 },
  { label: '50条/页', value: 50 },
  { label: '100条/页', value: 100 }
]

const storageTypeOptions = [
  { label: '本地存储', value: 'local' },
  { label: '阿里云OSS', value: 'oss' },
  { label: '腾讯云COS', value: 'cos' },
  { label: '七牛云', value: 'qiniu' }
]

const ossProviderOptions = [
  { label: '阿里云OSS', value: 'aliyun' },
  { label: '腾讯云COS', value: 'tencent' },
  { label: '七牛云', value: 'qiniu' },
  { label: 'AWS S3', value: 'aws' }
]

const passwordStrengthOptions = [
  { label: '低（任意字符）', value: 'low' },
  { label: '中（字母+数字）', value: 'medium' },
  { label: '高（字母+数字+特殊字符）', value: 'high' }
]

// 保存设置
const saveBasicSettings = async () => {
  await saveSettings('basic', settings.value.basic)
}

const saveSystemSettings = async () => {
  await saveSettings('system', settings.value.system)
}

const saveEmailSettings = async () => {
  await saveSettings('email', settings.value.email)
}

const saveStorageSettings = async () => {
  await saveSettings('storage', settings.value.storage)
}

const saveSecuritySettings = async () => {
  await saveSettings('security', settings.value.security)
}

const saveSettings = async (type: string, data: Settings[keyof Settings]) => {
  saving.value = true

  try {
    const { error } = await api.put(`/settings/${type}`, data)

    if (error) {
      throw new Error(error)
    }

    // 显示成功消息
    alert('设置保存成功！')
  } catch (err) {
    console.error('保存失败：', err)
    alert('保存失败，请重试')
  } finally {
    saving.value = false
  }
}

// 发送测试邮件
const testEmail = async () => {
  saving.value = true

  try {
    const { error } = await api.post('/settings/test-email', settings.value.email)

    if (error) {
      throw new Error(error)
    }

    alert('测试邮件已发送，请检查收件箱！')
  } catch (err) {
    console.error('发送失败：', err)
    alert('发送失败，请检查邮件配置')
  } finally {
    saving.value = false
  }
}

// ===== 字典管理 =====

// 字典类型列表
const dictTypes = ref<DictType[]>([])
const selectedDictType = ref<DictType | null>(null)
const dictDataList = ref<DictData[]>([])

// 字典类型表单
const showDictTypeModal = ref(false)
const editingDictType = ref<DictType | null>(null)
const dictTypeForm = ref({
  id: '',
  name: '',
  code: '',
  sort: 0,
  remark: ''
})

// 字典数据表单
const showDictDataModal = ref(false)
const editingDictData = ref<DictData | null>(null)
const dictDataForm = ref({
  id: '',
  label: '',
  value: '',
  sort: 0,
  status: 1,
  remark: ''
})

// 加载字典类型列表
const loadDictTypes = async () => {
  const { data, error } = await api.get('/dictionary/types')
  if (!error && data) {
    dictTypes.value = data
  }
}

// 选择字典类型
const selectDictType = async (dictType: DictType) => {
  selectedDictType.value = dictType
  await loadDictData(dictType.id)
}

// 加载字典数据列表
const loadDictData = async (typeId: string) => {
  const { data, error } = await api.get(`/dictionary/data?typeId=${typeId}`)
  if (!error && data) {
    dictDataList.value = data
  }
}

// 打开字典类型弹窗
const openDictTypeModal = (dictType?: DictType) => {
  if (dictType) {
    editingDictType.value = dictType
    dictTypeForm.value = {
      id: dictType.id || '',
      name: dictType.name || '',
      code: dictType.code || '',
      sort: dictType.sort || 0,
      remark: dictType.remark || ''
    }
  } else {
    editingDictType.value = null
    dictTypeForm.value = {
      id: '',
      name: '',
      code: '',
      sort: 0,
      remark: ''
    }
  }
  showDictTypeModal.value = true
}

// 保存字典类型
const saveDictType = async () => {
  // 验证
  if (!dictTypeForm.value.name.trim()) {
    alert('请输入字典名称')
    return
  }
  if (!dictTypeForm.value.code.trim()) {
    alert('请输入字典编码')
    return
  }

  saving.value = true

  try {
    const { error } = editingDictType.value
      ? await api.put(`/dictionary/types/${editingDictType.value.id}`, dictTypeForm.value)
      : await api.post('/dictionary/types', dictTypeForm.value)

    if (error) {
      throw new Error(error)
    }

    alert('保存成功！')
    showDictTypeModal.value = false
    await loadDictTypes()
  } catch (err) {
    console.error('保存失败：', err)
    alert('保存失败，请重试')
  } finally {
    saving.value = false
  }
}

// 删除字典类型
const deleteDictType = async (id: string) => {
  if (!confirm('确定要删除这个字典类型吗？删除后其下的所有字典数据也会被删除。')) {
    return
  }

  try {
    const { error } = await api.delete(`/dictionary/types/${id}`)

    if (error) {
      throw new Error(error)
    }

    alert('删除成功！')
    if (selectedDictType.value?.id === id) {
      selectedDictType.value = null
      dictDataList.value = []
    }
    await loadDictTypes()
  } catch (err) {
    console.error('删除失败：', err)
    alert('删除失败，请重试')
  }
}

// 打开字典数据弹窗
const openDictDataModal = (data?: DictData) => {
  if (!selectedDictType.value) {
    alert('请先选择字典类型')
    return
  }

  if (data) {
    editingDictData.value = data
    dictDataForm.value = {
      id: data.id || '',
      label: data.label || '',
      value: data.value || '',
      sort: data.sort || 0,
      status: data.status || 1,
      remark: data.remark || ''
    }
  } else {
    editingDictData.value = null
    dictDataForm.value = {
      id: '',
      label: '',
      value: '',
      sort: 0,
      status: 1,
      remark: ''
    }
  }
  showDictDataModal.value = true
}

// 保存字典数据
const saveDictData = async () => {
  // 验证
  if (!dictDataForm.value.label.trim()) {
    alert('请输入显示标签')
    return
  }
  if (!dictDataForm.value.value.trim()) {
    alert('请输入数据值')
    return
  }

  saving.value = true

  try {
    if (!selectedDictType.value) {
      throw new Error('请先选择字典类型')
    }

    const payload = {
      ...dictDataForm.value,
      typeId: selectedDictType.value.id || ''
    }

    const { error } = editingDictData.value
      ? await api.put(`/dictionary/data/${editingDictData.value.id || ''}`, payload)
      : await api.post('/dictionary/data', payload)

    if (error) {
      throw new Error(error)
    }

    alert('保存成功！')
    showDictDataModal.value = false
    await loadDictData(selectedDictType.value.id || '')
  } catch (err) {
    console.error('保存失败：', err)
    alert('保存失败，请重试')
  } finally {
    saving.value = false
  }
}

// 删除字典数据
const deleteDictData = async (id: string) => {
  if (!confirm('确定要删除这条字典数据吗？')) {
    return
  }

  try {
    const { error } = await api.delete(`/dictionary/data/${id || ''}`)

    if (error) {
      throw new Error(error)
    }

    alert('删除成功！')
    if (selectedDictType.value) {
      await loadDictData(selectedDictType.value.id || '')
    }
  } catch (err) {
    console.error('删除失败：', err)
    alert('删除失败，请重试')
  }
}

// 页面加载时初始化字典数据
onMounted(() => {
  loadDictTypes()
})
</script>
