<template>
  <h1>订单结果：{{ orderResult || "-" }}</h1>
  <h2>API 调用结果:</h2>
  <pre class="bg-[hsl(220_18%_10%)] rounded-2 p-4 text-#9cdcfe">{{
    apiResult ? JSON.stringify(apiResult, null, 2) : ""
  }}</pre>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { queryOrder } from "@/api/order";

type OrderResult = "成功" | "失败";

const apiResult = ref();
const orderResult = ref<OrderResult>();

let count = ref<number>(1);

const repeat = () => {
  count.value++;
  setTimeout(() => {
    query();
  }, 3000);
};

const query = () => {
  queryOrder().then((res) => {
    const { data } = res;
    apiResult.value = data;
    if (data.code === 1000) {
      // 订单成功
      orderResult.value = "成功";
    } else if (data.code === 1001) {
      // 订单失败
      orderResult.value = "失败";
    } else {
      // 未知状态，重新查询
      if (count.value == 10) {
        orderResult.value = "失败";
      } else {
        repeat();
      }
    }
  });
};

onMounted(() => {
  query();
});
</script>
