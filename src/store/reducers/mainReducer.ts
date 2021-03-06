import { omit, propOr, isNil } from 'ramda';

import { IContact, IContactList } from '../initialContactList';
import { EMPTY_CONTACT } from '../constants';

export type AppMode = 'EDIT_MODE' | 'CREATE_MODE' | 'VIEW_MODE';

export interface IState {
    readonly contactList: IContactList;
    readonly activeContact: IContact | null;
    readonly appMode: AppMode;
}

export type Action =
    | { type: 'CONTACT_CHOSEN'; payload: string | null }
    | { type: 'ADD_NEW_CONTACT'; payload: IContact }
    | { type: 'EDIT_CONTACT'; payload: IContact }
    | { type: 'DELETE_CONTACT'; payload: string }
    | { type: 'TOGGLE_MODE'; payload: AppMode };

export const reducer = (state: IState, action: Action) => {
    switch (action.type) {
        case 'CONTACT_CHOSEN':
            return {
                ...state,
                activeContact: !isNil(action.payload)
                    ? {
                          ...propOr<IContact>(EMPTY_CONTACT, action.payload)<
                              IContactList,
                              IContact
                          >(state.contactList),
                      }
                    : null,
            };
        case 'ADD_NEW_CONTACT':
            return {
                ...state,
                contactList: {
                    ...state.contactList,
                    [action.payload.id]: { ...action.payload },
                }
            };
        case 'EDIT_CONTACT':
            return {
                ...state,
                contactList: {
                    ...state.contactList,
                    [action.payload.id]: { ...action.payload },
                }
            };
        case 'DELETE_CONTACT':
            return {
                ...state,
                contactList: omit([action.payload], state.contactList),
            };
        case 'TOGGLE_MODE':
            return {
                ...state,
                appMode: action.payload,
            };

        default:
            return state;
    }
};
