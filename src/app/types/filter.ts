export type Filter = {
    search?: String,
    dateFrom?: String | Date,
    dateTo?: String | Date,
    status?: String,
};

export const filter: Filter = {
    search: '',
    dateFrom: '',
    dateTo: '',
    status: '',
} 