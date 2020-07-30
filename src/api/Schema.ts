export type User = {
    id: number,
    email: string,
    password?: string | null,
    password_change_count: string | number | null,
    reset_password_token: string | null,
    reset_password_sent_at: Date | null,
    sign_in_count: number,
    remember_created_at: Date | null,
    created_at: Date,
    updated_at: Date,
    account_id: number | string | null,
  }