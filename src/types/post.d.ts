declare namespace PostInterface {
    // 列表请求体
    export interface ListRequest {
        current: number
        pageSize: number
        text?: string
    }
    // 列表单元
    export interface ListItem {
        id: number
        title: string
        author: string
        createTime: string
        content: string
    }
    // 添加请求体
    export interface AddItem {
        id?: number
        title: string
        content: string
    }
    // 删除请求体
    export interface DelItem {
        id: number
    }
}