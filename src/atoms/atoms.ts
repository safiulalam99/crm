import { useQueryClient } from '@tanstack/react-query';
import { atom, useAtom } from 'jotai';
import { CustomerDashboardDetails, UserMetaData } from 'src/utils/atomTypes';
export const customerDashboardDetailsAtom = atom<CustomerDashboardDetails | {}>({});
export const loggedUser = atom('');
export const userAtom = atom({});
