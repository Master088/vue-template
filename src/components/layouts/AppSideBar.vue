<template>
  <div>
    <!-- Sidebar -->
    <div v-if="sidebarStore.isSidebarOpen"
      class="fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity lg:hidden"
      @click="sidebarStore.isSidebarOpen = false"></div>
    <aside
      class="absolute left-0 top-0 z-[60] mr-5 flex h-full w-[230px] flex-col overflow-y-hidden transition-all duration-500 ease-in-out lg:static lg:translate-x-0"
      :class="{
        'translate-x-0': sidebarStore.isSidebarOpen,
        '-translate-x-full': !sidebarStore.isSidebarOpen
      }" ref="target">
      <div class="h-full overflow-y-auto rounded-[15px] bg-white px-6 py-4" style="box-shadow: 0px 3px 6px #7086a40d">
        <div class="flex w-full items-center justify-between py-2">
          <!-- Logo -->
          <div class="logo-container cursor-pointer" @click="homepage"></div>

          <!-- Close Button (Mobile Only) -->
          <button @click="sidebarStore.isSidebarOpen = false" type="button" aria-controls="drawer-navigation"
            class="absolute right-3 top-3 rounded-lg p-1.5 text-gray-400 lg:hidden">
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"></path>
            </svg>
          </button>
        </div>

        <div v-if="isLoading" class="mt-6 animate-pulse space-y-4">
          <div class="h-10 w-full rounded-[10px] bg-gray-300 px-2 py-2"></div>
          <div class="h-10 w-full rounded-[10px] bg-gray-300 px-2 py-2"></div>
          <div class="h-10 w-full rounded-[10px] bg-gray-300 px-2 py-2"></div>
          <div class="h-10 w-full rounded-[10px] bg-gray-300 px-2 py-2"></div>
          <div class="h-10 w-full rounded-[10px] bg-gray-300 px-2 py-2"></div>
        </div>
        <ul v-else class="mt-6 space-y-2 font-medium">
          <li v-for="tab in filteredTabs" :key="tab.path">
            <router-link :to="tab.path" :class="[
              'group flex items-center rounded-[10px] px-2 py-2',
              isActive(tab.path)
                ? 'bg-[#2C2FBC] text-white shadow-lg'
                : 'hover:bg-white hover:shadow-lg'
            ]">
              <div :class="[
                'rounded-lg p-1 text-white',
                isActive(tab.path) ? 'bg-[#10115B]' : 'bg-[#f0f2f5ff]'
              ]">
                <div class="icon" v-html="getIcon(tab.path, tab.icon)"></div>
              </div>
              <span class="ms-3 text-[11px] font-medium text-[#344767] sm:text-[12px]"
                :class="[isActive(tab.path) ? 'text-white' : '']">{{ tab.label }}</span>
            </router-link>
          </li>
        </ul>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSidebarStore } from '@/stores/sidebarStore'

import { useAuthenticationStore } from '@/stores/auth'

const authStore = useAuthenticationStore()
// const userData = computed(() => authStore.userAccount)
// const userRoles = computed(() => authStore.userRoles)
const activeRole = computed(() => authStore.activeRole)

const isLoading = ref(false)

const target = ref(null)
const sidebarStore = useSidebarStore()
const route = useRoute()
const router = useRouter()

const isActive = (path) => route.path.includes(path)

const homepage = () => {
  router.push('/')
}

const getIcon = (path, baseIcon) => {
  const fillColor = isActive(path) ? '#FFFFFF' : '#344767'
  return baseIcon.replace(/{{fill}}/g, fillColor)
}

const filteredTabs = ref([
  {
    path: '/dashboard',
    label: 'Dashboard',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"  viewBox="-5 -5 24 24">
  <g id="icon-dashboard" transform="translate(-97.109 -125.609)">
    <path id="Path_5" data-name="Path 5" d="M1.621,0H4.864A1.621,1.621,0,0,1,6.485,1.621V4.864A1.621,1.621,0,0,1,4.864,6.485H1.621A1.621,1.621,0,0,1,0,4.864V1.621A1.621,1.621,0,0,1,1.621,0Z" transform="translate(97.109 125.609)" fill="{{fill}}"/>
    <path id="Path_6" data-name="Path 6" d="M1.621,0H4.864A1.621,1.621,0,0,1,6.485,1.621V4.864A1.621,1.621,0,0,1,4.864,6.485H1.621A1.621,1.621,0,0,1,0,4.864V1.621A1.621,1.621,0,0,1,1.621,0Z" transform="translate(97.109 133.609)" fill="{{fill}}"/>
    <path id="Path_7" data-name="Path 7" d="M1.621,0H4.864A1.621,1.621,0,0,1,6.485,1.621V4.864A1.621,1.621,0,0,1,4.864,6.485H1.621A1.621,1.621,0,0,1,0,4.864V1.621A1.621,1.621,0,0,1,1.621,0Z" transform="translate(105.109 133.609)" fill="{{fill}}"/>
    <circle id="Ellipse_1" data-name="Ellipse 1" cx="3.25" cy="3.25" r="3.25" transform="translate(105.109 125.609)" fill="{{fill}}"/>
  </g>
</svg>
`
  },
  //   {
  //     path: '/tasks',
  //     label: 'Tasks',
  //     icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="-5 -5 24 24">
  //   <g id="icon_task" transform="translate(-44 -26.51)">
  //     <path id="Exclusion_1" data-name="Exclusion 1" d="M5.59,15a.453.453,0,0,1-.206-.051.479.479,0,0,1-.16-.135.464.464,0,0,1-.086-.4c0-.007.586-2.388.59-2.4L8.075,14.39l-2.377.6A.44.44,0,0,1,5.59,15Zm3.283-1.132h0L6.244,11.209l4.6-4.648L13.47,9.219l-4.6,4.649Zm-4.493-.263H1.393a1.37,1.37,0,0,1-.984-.414,1.435,1.435,0,0,1-.3-.447A1.419,1.419,0,0,1,0,12.2V4.7H11.417l-.064.049h0a1.764,1.764,0,0,0-.18.152L5.257,10.877a1.488,1.488,0,0,0-.366.656ZM2.322,9.861a.464.464,0,0,0-.33.137.478.478,0,0,0,0,.667l.465.471a.479.479,0,0,0,.334.133.45.45,0,0,0,.324-.133l.929-.94a.475.475,0,0,0,0-.666.464.464,0,0,0-.659,0l-.6.611L2.651,10A.463.463,0,0,0,2.322,9.861Zm0-3.287a.464.464,0,0,0-.466.47.472.472,0,0,0,.136.334l.465.468a.482.482,0,0,0,.334.132.445.445,0,0,0,.324-.132s.914-.922.929-.939a.476.476,0,0,0,0-.667.467.467,0,0,0-.659,0l-.6.612-.135-.142A.465.465,0,0,0,2.322,6.574Zm3.252,0a.47.47,0,0,0,0,.939H7.432a.47.47,0,0,0,0-.939Zm6.968,7.03h-2.1l3.49-3.527V12.2a1.406,1.406,0,0,1-.411.994,1.373,1.373,0,0,1-.983.414Zm1.588-5.053h0L11.5,5.895l.324-.33a1.309,1.309,0,0,1,.457-.3,1.464,1.464,0,0,1,1.06,0,1.323,1.323,0,0,1,.457.3l.655.663a1.379,1.379,0,0,1,.3.466,1.43,1.43,0,0,1,0,1.063,1.386,1.386,0,0,1-.3.466l-.326.328Zm-.194-4.795H0V2.334a1.4,1.4,0,0,1,.409-.994,1.382,1.382,0,0,1,.442-.3A1.366,1.366,0,0,1,1.393.925h.465V.468A.468.468,0,0,1,1.995.137a.46.46,0,0,1,.655,0,.471.471,0,0,1,.137.331v1.4a.439.439,0,0,0,.463.453.44.44,0,0,0,.466-.453V.925H6.038V.468A.473.473,0,0,1,6.175.137a.46.46,0,0,1,.655,0,.47.47,0,0,1,.138.331v1.4a.464.464,0,0,0,.927,0V.925h2.323V.468a.475.475,0,0,1,.136-.331.462.462,0,0,1,.657,0,.472.472,0,0,1,.136.331v1.4a.465.465,0,0,0,.929,0V.925h.465a1.377,1.377,0,0,1,.983.414,1.406,1.406,0,0,1,.3.447,1.423,1.423,0,0,1,.11.547V3.757Z" transform="translate(44 26.51)" fill="{{fill}}"/>
  //   </g>
  // </svg>

  // `
  //   },
  //   {
  //     path: '/payments',
  //     label: 'Payment',
  //     icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" viewBox="-3 -6 24 24">
  //   <defs>
  //     <clipPath id="clip-path">
  //       <path id="Path_34" data-name="Path 34" d="M0,73.125H19.014V84.738H0Zm0,0" fill="{{fill}}"/>
  //     </clipPath>
  //   </defs>
  //   <g id="icons_payment" transform="translate(0 -73.125)" clip-path="url(#clip-path)">
  //     <path id="Path_33" data-name="Path 33" d="M16.507,81.121a.251.251,0,0,0-.25-.251H14.718a.251.251,0,0,0-.251.251v1.538a.25.25,0,0,0,.251.25h1.538a.25.25,0,0,0,.25-.25Zm-9.43,1.321H1.283v.468H7.077Zm-5.794-1.1H5.358V80.87H1.283ZM18.7,77.328V83.4a1.328,1.328,0,0,1-1.329,1.329H1A1.328,1.328,0,0,1-.324,83.4V77.328Zm0-2.887v1.014H-.324V74.442A1.329,1.329,0,0,1,1,73.113H17.371A1.329,1.329,0,0,1,18.7,74.442" transform="translate(0.308 0.011)" fill="{{fill}}"/>
  //   </g>
  // </svg>
  // `
  //   },
  //   {
  //     path: '/clients',
  //     label: 'Clients',
  //     icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="-4 -4 24 24" >
  //   <g id="icons_clients" transform="translate(0.002 -26.795)">
  //     <path id="Exclusion_4" data-name="Exclusion 4" d="M16.584,14.742H.535A.588.588,0,0,1,0,14.4V6.682H2.292v.68a.588.588,0,0,0,.588.587h.409a.588.588,0,0,0,.588-.587v-.68h9.366v.68a.588.588,0,0,0,.588.587h.409a.588.588,0,0,0,.587-.587v-.68h2.341V14.23A.589.589,0,0,1,16.584,14.742ZM14.245,7.268h-.421a.1.1,0,0,1,0-.2h.421a.1.1,0,1,1,0,.2Zm-10.95,0H2.874a.1.1,0,1,1,0-.2h.421a.1.1,0,1,1,0,.2Zm13.872-.986H14.826V5.845H13.242v.437H3.876V5.845H2.292v.437H0v-3.7a.588.588,0,0,1,.535-.343H3.466l.42-.759h.281a1.819,1.819,0,0,1,.342-.4A3.082,3.082,0,0,1,5.242.6,5.542,5.542,0,0,1,6.5.2,10.519,10.519,0,0,1,8.428,0V0h.263V0A10.514,10.514,0,0,1,10.616.2,5.542,5.542,0,0,1,11.876.6a3.08,3.08,0,0,1,.732.474,1.821,1.821,0,0,1,.342.4h.282l.42.759h2.931a.589.589,0,0,1,.583.512V6.281ZM8.428.635h0A11.573,11.573,0,0,0,6.683.772a3.592,3.592,0,0,0-1.823.7h.17l.421.759h6.219l.42-.759h.17a3.589,3.589,0,0,0-1.823-.7A11.582,11.582,0,0,0,8.691.635v0l-.131,0-.13,0h0v0Z" transform="translate(-0.002 26.795)" fill="{{fill}}"/>
  //   </g>
  // </svg>
  // `
  //   },
  //   {
  //     path: '/users',
  //     label: 'Users',
  //     icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="-2 -5 24 24">
  //   <g id="icons_users" transform="translate(1.683 -79.377)">
  //     <path id="Exclusion_5" data-name="Exclusion 5" d="M14.9,12.677H5.1a.35.35,0,0,1-.336-.239A4.8,4.8,0,0,1,4.828,11.4a4.946,4.946,0,0,1,.272-.982,5.149,5.149,0,0,1,.46-.9,5.341,5.341,0,0,1,.625-.8,5.4,5.4,0,0,1,.786-.682,5.31,5.31,0,0,1,.909-.52,5.166,5.166,0,0,1,1.006-.331A5.058,5.058,0,0,1,9.964,7.07H10a5.252,5.252,0,0,1,5.175,4.36c0,.077.02.175.036.278v0c.047.287.1.645-.043.833A.368.368,0,0,1,14.9,12.677ZM4.072,11.723H.358A.358.358,0,0,1,0,11.365,3.527,3.527,0,0,1,.273,9.932a3.673,3.673,0,0,1,.776-1.16,3.933,3.933,0,0,1,.592-.494,3.986,3.986,0,0,1,.676-.371,3.93,3.93,0,0,1,.735-.233,3.754,3.754,0,0,1,.77-.081,3.54,3.54,0,0,1,1.84.512,5.9,5.9,0,0,0-1.589,3.616h0Zm15.573,0H15.93a5.9,5.9,0,0,0-1.125-3.055,5.29,5.29,0,0,0-.464-.561A3.772,3.772,0,0,1,20,11.365.358.358,0,0,1,19.645,11.723ZM16.234,7.349A2.349,2.349,0,0,1,13.887,5a2.387,2.387,0,0,1,.766-1.747,2.257,2.257,0,0,1,.739-.437,2.5,2.5,0,0,1,1.682,0,2.254,2.254,0,0,1,.739.437A2.388,2.388,0,0,1,18.58,5a2.348,2.348,0,0,1-2.347,2.348Zm-12.465,0A2.349,2.349,0,0,1,1.422,5a2.387,2.387,0,0,1,.766-1.747,2.255,2.255,0,0,1,.739-.437,2.5,2.5,0,0,1,1.682,0,2.253,2.253,0,0,1,.739.437A2.387,2.387,0,0,1,6.115,5,2.348,2.348,0,0,1,3.768,7.349ZM9.99,6.408h0a3,3,0,0,1-.856-.124A3.187,3.187,0,0,1,8.2,5.847,3.227,3.227,0,0,1,6.966,4.242,3.191,3.191,0,0,1,6.79,3.193,3.293,3.293,0,0,1,7.843.8,3.087,3.087,0,0,1,8.853.2a3.4,3.4,0,0,1,2.3,0,3.088,3.088,0,0,1,1.01.6,3.293,3.293,0,0,1,1.053,2.394A3.1,3.1,0,0,1,12.3,5.421,3.276,3.276,0,0,1,9.99,6.408Z" transform="translate(-1.683 79.377)" fill="{{fill}}"/>
  //   </g>
  // </svg>
  // `
  //   }
]
)



</script>

<style scoped>
.logo-container {
  width: 100%;
  height: 50px;
  background-image: url('@/assets/images/logo.png');
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
