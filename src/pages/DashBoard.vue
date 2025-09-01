<template>
    <div class="p-6 bg-gray-100 min-h-screen">
        <!-- Page Title -->
        <div class="flex items-center mb-6">
            <i class="fas fa-tachometer-alt text-blue-600 text-2xl mr-3"></i>
            <h1 class="text-2xl font-semibold text-gray-800">Dashboard</h1>
        </div>

        <!-- Dashboard Stats -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Users -->
            <div class="bg-white p-6 rounded-xl shadow flex items-center">
                <i class="fas fa-users text-green-500 text-3xl mr-4"></i>
                <div>
                    <p class="text-sm text-gray-500">Total Users</p>
                    <p class="text-xl font-bold text-gray-800">1,250</p>
                </div>
            </div>

            <!-- Revenue -->
            <div class="bg-white p-6 rounded-xl shadow flex items-center">
                <i class="fas fa-dollar-sign text-yellow-500 text-3xl mr-4"></i>
                <div>
                    <p class="text-sm text-gray-500">Revenue</p>
                    <p class="text-xl font-bold text-gray-800">$45,000</p>
                </div>
            </div>

            <!-- Notifications -->
            <div class="bg-white p-6 rounded-xl shadow flex items-center">
                <i class="fas fa-bell text-red-500 text-3xl mr-4"></i>
                <div>
                    <p class="text-sm text-gray-500">Notifications</p>
                    <p class="text-xl font-bold text-gray-800">12</p>
                </div>
            </div>
        </div>

        <!-- Recent Activity -->
        <div class="mt-8 bg-white p-6 rounded-xl shadow">
            <h2 class="text-lg font-semibold mb-4 flex items-center">
                <i class="fas fa-history mr-2 text-blue-500"></i>
                Recent Activity
            </h2>
            <ul class="space-y-3">
                <li class="flex items-center text-gray-700">
                    <i class="fas fa-check-circle text-green-500 mr-2"></i>
                    User <span class="font-semibold">John Doe</span> created a new project.
                </li>
                <li class="flex items-center text-gray-700">
                    <i class="fas fa-edit text-yellow-500 mr-2"></i>
                    Profile updated by <span class="font-semibold">Jane Smith</span>.
                </li>
                <li class="flex items-center text-gray-700">
                    <i class="fas fa-trash-alt text-red-500 mr-2"></i>
                    Project <span class="font-semibold">Old Report</span> was deleted.
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
// later you can fetch dynamic data from stores/api here
</script>
