<template>
    <input class='w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' v-model='modelValue' :placeholder='placeholder' />
</template>

<script lang='ts'>
    import { onMounted, ref } from 'vue';
    export default {
        name: 'InputField',
        props: {
            placeholder: String, 
            value: [Number, String], // Allow both numbers and strings
        },
        setup(props: any) {
            const modelValue = ref(props.value);

            function setUpInput() {
                modelValue.value = props.value;
            }

            onMounted(() => {
                setUpInput();
            });

            return {
                modelValue
            };
        }
    }
</script>
