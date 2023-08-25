<template>
    <div :class='classes'>
        <p class='text-xs text-white'>{{ title }}</p>
    </div>
</template>

<script lang='ts'>
    import { ref } from 'vue';
    import Badge from '@/interfaces/badge';
    export default {
        name: 'StatusBadge',
        props: {
            badge: {
                type: Object as () => Badge,
                required: true
            }
        },
        setup(props: any) {
            var classes = ref<string>('flex content-center flex-wrap justify-center rounded-full');
            var title = ref<string>('');
            function buildBadge() {
                switch (props.badge.available) {
                    case 1:
                    case true:
                        classes.value += ' bg-green-600';
                        switch (props.badge.type) {
                            case 'location':
                                title.value = 'In Betrieb';
                                break;
                            case 'connection':
                                title.value = 'Verfügbar';
                                break;
                        }
                        break;
                    case 0:
                    case false:
                        classes.value += ' bg-red-600';
                        switch (props.badge.type) {
                            case 'location':
                                title.value = 'Defekt';
                                break;
                            case 'connection':
                                title.value = 'Belegt';
                                break;
                        }
                        break;
                    default: 
                        classes.value += ' bg-orange-600';
                        switch (props.badge.type) {
                            case 'location':
                            case 'connection':
                                title.value = 'Unbekannt';
                                break;
                            default:
                                break;
                        }
                }
            }

            buildBadge();

            return {
                title,
                buildBadge,
                classes
            }
        }
    }
</script>

<style scoped lang='scss'></style>