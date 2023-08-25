<template>
    <div class='w-full flex-col justify-center content-center shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-8'>
        <div class='w-full py-2 px-3 justify-center'>
            <div class='w-full justify-center relative z-0 mb-8'>
                <h2 class='w-full text-xl font-bold text-center'>{{ $props.location.properties.address.title }}</h2>
                <status-badge class='w-[72px] absolute inset-0 z-10' :badge='{ type: "location", available: $props.location.properties.status.operational || false}' />
            </div>
            <div>
                <p class='mb-2 text-center text-sm'>{{ getLocationAddress($props.location.properties.address) }}</p>
                <span class='mb-4 text-sm flex flex-row justify-center'>
                    <p v-bind:class='available !== undefined && available.valueOf() > 0 ? "text-green-600" : "text-red-600" '>{{ available }}</p>
                    <p>/</p>
                    <p>{{ $props.location.properties.connections.length }} verfügbar</p>
                </span>
            </div>
            <div class='flex flex-row justify-center mb-2' v-for='connection in $props.location.properties.connections' :key='connection.id'>
                <svg-icon type='mdi' :path='getPlugIconName(connection.type.id)'></svg-icon>
                <status-badge class='w-[72px] ml-4' :badge='{ type: "connection", available: connection.status.operational}' />
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
    import { onMounted, ref } from 'vue';
    import Location, { LocationAddress, LocationConnection } from '@/interfaces/location';
    import StatusBadge from './statusBadge.vue';
    import SvgIcon from '@jamescoyle/vue-icon/lib/svg-icon.vue'
    import { mdiEvPlugCcs2, mdiEvPlugType2, mdiEvPlugChademo } from '@mdi/js';
    export default {
        name: 'LocationCard',
        props: {
            location: {
                type: Object as () => Location,
                required: true
            }
        },
        components: {
            StatusBadge,
            SvgIcon
        },
        setup(props: any) {

            var available = ref<number>();

            function getLocationAddress(address: LocationAddress) {
                return `${address.country}, ${address.postcode} ${address.city}, ${address.street}`
            }

            function getAvailableConnectionsCount(connections: LocationConnection[]) {
                const availableCount = connections.reduce((count, connection) => {
                    if (connection.status.operational && connection.status.selectable) {
                        return count + 1;
                    }
                    return count;
                }, 0);
                available.value = availableCount;
            }

            function getPlugIconName(type: number) {
                switch (type) {
                    case 2: // chademo
                        return mdiEvPlugChademo;
                    case 25: // type 2
                        return mdiEvPlugType2;
                    case 33: // ccs type 2
                        return mdiEvPlugCcs2;
                    default:
                        return mdiEvPlugType2;
                }
            }

            onMounted(() => {
                getAvailableConnectionsCount(props.location.connections)
            })

            return {
                getLocationAddress,
                getAvailableConnectionsCount,
                available,
                getPlugIconName
            }
        }
    }
</script>

<style scoped lang='scss'></style>