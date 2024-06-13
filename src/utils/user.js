import { ADMIN_ROLE, USER_ROLE } from "@/constants/userRoles";

const isUserLoggedIn = (user) => !!user && user.token;

const isAdminRole = (user) => isUserLoggedIn(user) && user.role === ADMIN_ROLE;

const isUserRole = (user) => isUserLoggedIn(user) && user.role === USER_ROLE;

export { isUserLoggedIn, isAdminRole, isUserRole };
