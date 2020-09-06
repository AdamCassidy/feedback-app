<template>
<div>
    <comment-input @submit="(comment) => $emit('submit', comment)"></comment-input>
</div>
</template>

<script>
export default {
    data() {
        return {}
    }
}
</script>
