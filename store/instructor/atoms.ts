"use client";

import { atom } from 'recoil'

export const instructorState = atom({
    key: "instructorState",
    default: null as null | {uuid: string, name: string, email: string}
})