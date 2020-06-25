<template>
    <div :class="className">
        <table>
            <thead>
                <tr>
                    <td v-for="(title, index) in Thead" :key="index">{{title}}</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>test</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    props: {
        Thead: Array,
        className: String
    },
}
</script>

<style>
</style>