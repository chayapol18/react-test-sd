import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

interface ApplicantState {
  data: any[];
  editData: any;
  isEdit: boolean;
  isSelectedAll: boolean;
}

const initialState: ApplicantState = {
  data: [],
  editData: {},
  isEdit: false,
  isSelectedAll: false,
};

interface editItemsState {
  item: object;
  index: number;
}

const applicantSlice = createSlice({
  name: 'applicant',
  initialState,
  reducers: {
    addMultipleApplicantData(state) {
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
      localStorage.setItem('applicantData', JSON.stringify(state.data))
    },
    updateApplicantData(state, action: PayloadAction<any[]>) {
      if (action.payload.length === 0) {
        localStorage.setItem('applicantData', '')
      } else {
        localStorage.setItem('applicantData', JSON.stringify(action.payload))
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
    editApplicantData(state, action: PayloadAction<editItemsState>) {
      state.data[action.payload.index] = action.payload.item
      localStorage.setItem('applicantData', JSON.stringify(state.data))
    }
  },
});

export const { addMultipleApplicantData, updateApplicantData, updateIsEdit, updateIsSelectedAll, updateEditItem, editApplicantData } = applicantSlice.actions;
export default applicantSlice.reducer;