import { format, addDays } from "date-fns"

export function renderDate(dateString: Date) {
    return format(addDays(new Date(dateString), 1), 'dd/MM/yyyy')
}
