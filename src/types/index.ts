export interface TaskStatus {
  id: number;
  label: string;
}

export interface TaskResponse {
  data: Task[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

export interface Task {
  id: string;
  transaction_id: string;
  user_created: string;
  user_submitted_for: string | null;
  params: string;
  created_at: string;
  modified_at: string;
  priority: string | null;
  duration: string | null;
  created_by: string;
  assigned_by: string | null;
  request_reviewed_by: string | null;
  doc_reviewed_by: string | null;
  work_permit_id: string | null;
  zone_id: string | null;
  emirate_id: string | null;
  parent_task_id: string | null;
  old_id: string | null;
  modified_by: string;
  task_status_id: number;
  task_type_id: number;
  category_id: number;
  rejection_reason: string | null;
  establishment_id: string | null;
  person_id: string | null;
  establishment_name_en: string | null;
  establishment_name_ar: string | null;
  pool_id: string;
  pool: string;
  rule: string | null;
  bu_id: string | null;
  pool_type: string | null;
  task_visibility: string | null;
  realm_name: string | null;
  system_pool: boolean;
  attributes: string | null;
  is_active: boolean;
  user_id: string | null;
  person_name_en: string | null;
  person_name_ar: string | null;
  risk_score: string | null;
  assigned_to: string;
  group_id: string | null;
}

export interface ParsedParams {
  [key: string]: any;
}

export interface ApprovalPayload {
  task_id: string;
  comment: string;
}