export interface AdminUser {
  id?: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

export interface AdminAccountCredential {
  email: string;
  passwordHashOrPlain: string;
  user: AdminUser;
}

export const AUTH_STORAGE_KEY = 'loistiq_admin_auth';
export const AUTH_USER_KEY = 'loistiq_admin_user';
export const AUTH_CHANGE_EVENT = 'loistiq_admin_auth_change';

export const DEFAULT_ADMIN_USER: AdminUser = {
  id: 'admin-01',
  name: 'Nguyễn Hữu Trường',
  email: 'nguyenhuutruong6666@gmail.com',
  role: 'Super Administrator',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
};

//Danh sách tài khoản Quản trị viên được cấp quyền truy cập hệ thống LOISTIQ
export const ADMIN_ACCOUNTS: AdminAccountCredential[] = [
  {
    email: 'nguyenhuutruong6666@gmail.com',
    passwordHashOrPlain: '123456',
    user: {
      id: 'admin-01',
      name: 'Nguyễn Hữu Trường',
      email: 'nguyenhuutruong6666@gmail.com',
      role: 'Super Administrator',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    },
  },
  {
    email: 'admin@loistiq.com',
    passwordHashOrPlain: 'admin123',
    user: {
      id: 'admin-02',
      name: 'Giám Đốc Quản Trị LOISTIQ',
      email: 'admin@loistiq.com',
      role: 'Super Administrator',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    },
  },
];

//Xác thực thông tin đăng nhập Quản trị viên
export async function authenticateAdmin(
  email: string,
  pass: string
): Promise<{ success: boolean; user?: AdminUser; message?: string }> {
  // Giả lập độ trễ xác thực an toàn
  await new Promise((resolve) => setTimeout(resolve, 500));

  const cleanEmail = email.trim().toLowerCase();
  const cleanPass = pass.trim();

  const foundAccount = ADMIN_ACCOUNTS.find(
    (acc) => acc.email.toLowerCase() === cleanEmail && acc.passwordHashOrPlain === cleanPass
  );

  if (foundAccount) {
    return {
      success: true,
      user: foundAccount.user,
    };
  }

  return {
    success: false,
    message: 'Email hoặc mật khẩu quản trị không chính xác. Vui lòng kiểm tra lại!',
  };
}

//Lưu phiên đăng nhập vào LocalStorage
export function persistAdminAuth(user: AdminUser): void {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTH_STORAGE_KEY, 'true');
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
      window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
    }
  } catch (e) {
    console.error('Failed to save admin auth to localStorage', e);
  }
}

//Xóa phiên đăng nhập khỏi LocalStorage
export function removeAdminAuth(): void {
  try {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      localStorage.removeItem(AUTH_USER_KEY);
      window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
    }
  } catch (e) {
    console.error('Failed to remove admin auth from localStorage', e);
  }
}

//Lấy trạng thái đăng nhập từ LocalStorage
export function getAdminAuthSnapshot(): boolean {
  try {
    return typeof window !== 'undefined' && localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

let cachedUserRaw: string | null = null;
let cachedUser: AdminUser | null = null;

//Lấy thông tin người dùng quản trị hiện tại (được cache reference tránh infinite loop)
export function getAdminUserSnapshot(): AdminUser | null {
  try {
    if (typeof window === 'undefined') return null;
    const isAuth = localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
    if (!isAuth) {
      cachedUserRaw = null;
      cachedUser = null;
      return null;
    }
    const rawUser = localStorage.getItem(AUTH_USER_KEY);
    if (rawUser !== cachedUserRaw) {
      cachedUserRaw = rawUser;
      if (rawUser) {
        try {
          cachedUser = JSON.parse(rawUser) as AdminUser;
        } catch {
          cachedUser = DEFAULT_ADMIN_USER;
        }
      } else {
        cachedUser = DEFAULT_ADMIN_USER;
      }
    }
    return cachedUser ?? DEFAULT_ADMIN_USER;
  } catch {
    return DEFAULT_ADMIN_USER;
  }
}

export function getServerUserSnapshot(): null {
  return null;
}

export function getServerAuthSnapshot(): boolean {
  return false;
}

//Đăng ký theo dõi sự thay đổi trạng thái Auth giữa các tabs/windows
export function subscribeAdminAuth(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('storage', callback);
  window.addEventListener(AUTH_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(AUTH_CHANGE_EVENT, callback);
  };
}
