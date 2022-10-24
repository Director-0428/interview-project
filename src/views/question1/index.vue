<template>
  <div class="header">
    <el-button @click="addDataItem" type="primary">添加</el-button>
  </div>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column label="序号">
      <template #default="{ $index }"> {{ $index + 1 }}</template>
    </el-table-column>
    <el-table-column prop="id" label="id" width="180" />
    <el-table-column prop="title" label="标题" width="180" />
    <el-table-column prop="author" label="作者" width="180" />
    <el-table-column label="createTime">
      <template #default="{ row }">
        <span>{{ formatTime(row.createTime) }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="{ row }">
        <el-button link type="primary" @click="editDataItem(row)">编辑</el-button>
        <el-popconfirm @confirm="delDataitem(row)" :title="`确定需要删除${row.title}?`">
          <template #reference>
            <el-button link type="primary">删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <div class="footer">
    <el-pagination
      v-model:current-page="page"
      v-model:page-size="pageSize"
      background
      layout="total, prev, pager, next, sizes"
      :total="total"
      @current-change="pageChange"
      @size-change="pageSizeChange"
      :default-page-size="4"
      :page-sizes="[4, 20, 30, 40]"
    />
  </div>
  <el-dialog v-model="dialogVisible" :title="dialogTitle" width="30%">
    <el-form :model="editData">
      <el-form-item label="标题">
        <el-input v-model="editData.title" />
      </el-form-item>
      <el-form-item label="内容">
        <el-input type="textarea" maxlength="130" v-model="editData.content" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveDataItem">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { getPosts, addPost, updatePost, deletePost } from "@/api/post";
import { dayjs, ElMessage } from "element-plus";

let page = ref<number>(1);
let pageSize = ref<number>(4);
let total = ref<number>(0);
let tableData = reactive<PostInterface.ListItem[]>([]);

let dialogTitle = ref<string>("添加");
let dialogVisible = ref<boolean>(false);
let editData = reactive<PostInterface.AddItem>({
  title: "",
  content: "",
});

// 格式化时间
const formatTime = (time: string): string => {
  let timeStr = "";

  timeStr = dayjs(time).format("YYYY-MM-DD hh:mm:ss");

  return timeStr;
};

// 添加新的数据
const addDataItem = () => {
  editData.content = "";
  editData.title = "";
  editData.id = undefined;
  dialogTitle.value = "添加";
  dialogVisible.value = true;
};

// 编辑旧的数据
const editDataItem = (data: PostInterface.ListItem) => {
  let { id, title, content } = data;
  editData.content = content;
  editData.title = title;
  editData.id = id;
  dialogTitle.value = "编辑";
  dialogVisible.value = true;
};

// 删除已有数据
const delDataitem = (data: PostInterface.ListItem) => {
  let params: PostInterface.DelItem = {
    id: data.id,
  };
  deletePost(params).then((res) => {
    if (res.success) {
      getDataListFunc();
      ElMessage({
        message: "操作成功",
        type: "success",
      });
    }
  });
};

// 保存数据
const saveDataItem = () => {
  let params = {
    ...editData,
  };
  if (params.id) {
    // 更新数据
    updatePost(params).then((res) => {
      if (res.success) {
        getDataListFunc();
        ElMessage({
          message: "操作成功",
          type: "success",
        });
      }
      dialogVisible.value = false;
    });
  } else {
    // 新增数据
    addPost(params).then((res) => {
      if (res.success) {
        getDataListFunc();
        ElMessage({
          message: "操作成功",
          type: "success",
        });
      }
      dialogVisible.value = false;
    });
  }
};

// 分页触发
const pageChange = () => {
  getDataListFunc();
};

// 每页显示数量变化
const pageSizeChange = () => {
  page.value = 1;
  getDataListFunc();
};

// 获取数据列表
const getDataListFunc = () => {
  let params: PostInterface.ListRequest = {
    current: page.value,
    pageSize: pageSize.value,
  };
  getPosts(params).then((res) => {
    if (res.success) {
      total.value = res.data.total;

      tableData.length = 0;
      tableData.push(...res.data.list);
    }
  });
};

onMounted(() => {
  getDataListFunc();
});
</script>

<style>
.footer {
  padding-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
