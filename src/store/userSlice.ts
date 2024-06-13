import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

interface UserState {
  data: any[];
  editData: any;
  isEdit: boolean;
  isSelectedAll: boolean;
}

const initialState: UserState = {
  data: [],
  editData: {},
  isEdit: false,
  isSelectedAll: false,
};

interface editItemsState {
  item: object;
  index: number;
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addMultipleUserData(state) {
      for (let i = 0; i < 15; i++) {
        state.data.push({
          title: "นาย",
          firstName: `เทส${i}`,
          lastName: "ทดสอบ",
          birthdate: 1717174800000,
          nationality: "ไทย",
          idCard: "1",
          idCard2: "2223",
          idCard3: "13331",
          idCard4: "31",
          idCard5: "3",
          gender: i % 2 === 0 ? "หญิง" : i % 3 === 0 ? "ชาย" : "ไม่ระบุ",
          phoneCode: "+66",
          phoneNumber: `8012345${i}`,
          expectedSalary: "99990",
          key: `m${i}${dayjs().valueOf()}`,
          id: `m${i}${dayjs().valueOf()}`,
          fullName: `นายเทส${i} ทดสอบ`,
          fullPhoneNumber: `+668012345${i}`,
          fullIdCard: "1222313331313"
        })
      }
      localStorage.setItem('userData', JSON.stringify(state.data))
    },
    updateUserData(state, action: PayloadAction<any[]>) {
      if (action.payload.length === 0) {
        localStorage.setItem('userData', '')
      } else {
        localStorage.setItem('userData', JSON.stringify(action.payload))
      }
      state.data = action.payload;
    },
    updateIsEdit(state, action: PayloadAction<boolean>) {
      state.isEdit = action.payload
    },
    updateIsSelectedAll(state, action: PayloadAction<boolean>) {
      state.isSelectedAll = action.payload
    },
    updateEditItem(state, action: PayloadAction<object>) {
      state.editData = action.payload
    },
    editUserData(state, action: PayloadAction<editItemsState>) {
      state.data[action.payload.index] = action.payload.item
      localStorage.setItem('userData', JSON.stringify(state.data))
    }
  },
});

export const { updateUserData, updateIsEdit, editUserData, updateEditItem, addMultipleUserData, updateIsSelectedAll } = userSlice.actions;
export default userSlice.reducer;