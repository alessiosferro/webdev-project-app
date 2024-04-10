import {SelectOption} from "@/model/types";

export default function mapToOptions(data?: { id: number, name: string }[] | null) {
    if (!data) return [] as SelectOption[];

    return data.map(item => ({
        value: item.id.toString(),
        label: item.name
    })) as SelectOption[]
}