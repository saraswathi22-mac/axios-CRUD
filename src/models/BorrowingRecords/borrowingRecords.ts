export interface IBorrowingRecords {
    record_id: number;
    book_id: number;
    user_id: number;
    borrow_date: Date;
    due_date: Date;  // also return date
    fine_amount: number;
}