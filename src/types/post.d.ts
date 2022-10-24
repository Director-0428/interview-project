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
    export interface ListResponsedData {
        total: number
        list: ListItem[]
    }
    // 列表返回体
    export type ListResponsed = MResponse<ListResponsedData>
    // 添加请求体
    export interface AddItem {
        id?: number
        title: string
        content: string
    }
    // 添加的返回数据
    export interface AddResponsedData extends ListItem { }
    // 添加返回体
    export type AddResponsed = MResponse<AddResponsedData>

    // 删除请求体
    export interface DelItem {
        id: number
    }
    // 删除返回体
    export type DelResponsed = MResponse<number>
}