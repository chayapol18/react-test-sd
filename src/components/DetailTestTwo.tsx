import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { useSelector, useDispatch } from 'react-redux';
import rootReducer from '../store/reducers';
import countryPhoneCodes from '../assets/countryPhoneCodes.json'

import { 
    Flex, 
    Col, 
    Row, 
    Form, 
    Input, 
    Button, 
    Select, 
    Radio, 
    DatePicker,
    Table,
    Checkbox,
    Popconfirm,
} from 'antd'
import type { FormProps, GetProps, TableColumnsType, TableProps, CheckboxProps } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import buddhistEra from 'dayjs/plugin/buddhistEra';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { updateApplicantData, updateIsEdit, editApplicantData, updateEditItem, addMultipleApplicantData, updateIsSelectedAll } from '../store/applicantSlice'

import './DetailTestTwo.scss'

dayjs.extend(buddhistEra);
dayjs.extend(customParseFormat);

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

type TableRowSelection<T> = TableProps<T>['rowSelection'];

type FieldType = {
    id?: number;
    title?: string;
    firstName?: string;
    lastName?: string;
    birthdate?: string;
    nationality?: string;
    idCard?: string;
    idCard2?: string;
    idCard3?: string;
    idCard4?: string;
    idCard5?: string;
    gender?: string;
    phoneCode?: string;
    phoneNumber?: string;
    passportId?: string;
    expectedSalary?: string;
};

interface DataType {
    key: React.Key;
    fullName: string;
    gender: string;
    fullPhoneNumber: string;
    nationality: string;
}

function DetailTestTwo() {
    const { i18n } = useTranslation();
    const [form] = Form.useForm();
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const isEditStore = useSelector((state: ReturnType<typeof rootReducer>) => state.applicant.isEdit);
    const isSelectedAllStore = useSelector((state: ReturnType<typeof rootReducer>) => state.applicant.isSelectedAll);
    const applicantDataStore = useSelector((state: ReturnType<typeof rootReducer>) => state.applicant.data);
    const applicantEditDataStore = useSelector((state: ReturnType<typeof rootReducer>) => state.applicant.editData);
    const dispatch = useDispatch();

    useEffect(() => {
        const localData = localStorage.getItem('applicantData')
        if (localData !== null && localData.length > 0) {
            const data = JSON.parse(localData)
            dispatch(updateApplicantData(data.sort((a: any, b: any) => b.id - a.id)))
        }
        
    }, [])

    
const columns: TableColumnsType<DataType> = [
    {
      title: i18n.t('TestTwo.FullName'),
      dataIndex: 'fullName',
      sorter: {
        compare: (a, b) => a.fullName.localeCompare(b.fullName, i18n.language)
      },
    },
    {
      title: i18n.t('TestTwo.Gender'),
      dataIndex: 'gender',
      sorter: {
        compare: (a, b) => a.gender.localeCompare(b.gender, i18n.language)
      },
    },
    {
      title: i18n.t('TestTwo.PhoneNumberColumn'),
      dataIndex: 'fullPhoneNumber',
      sorter: {
        compare: (a, b) => a.fullPhoneNumber.localeCompare(b.fullPhoneNumber)
      },
    },
    {
      title: i18n.t('TestTwo.Nationality'),
      dataIndex: 'nationality',
      sorter: {
        compare: (a, b) => a.nationality.localeCompare(b.nationality, i18n.language)
      },
    },
    {
      title: i18n.t('TestTwo.Manage'),
      dataIndex: 'manage',
      render: (_, record) => 
      <Flex>
        <Button icon={<EditOutlined />} style={{marginRight: '8px'}} onClick={() => onEditApplicantData(record)}/>
        <Popconfirm
            title={i18n.t('TestTwo.TitlePopupDelete')}
            description={i18n.t('TestTwo.DetailPopupDelete')}
            okText={i18n.t('TestTwo.ConfirmPopupDeleteAll')}
            onConfirm={() => onDeleteApplicantData(record.key)}
            cancelText={i18n.t('TestTwo.CancelPopupDeleteAll')}
        >
            <Button disabled={isEditStore} icon={<DeleteOutlined />} />
        </Popconfirm>
      </Flex>,
        },
    ];

    const onEditApplicantData = (item: any) => {
        dispatch(updateEditItem(item))
        dispatch(updateIsEdit(true))
        form.setFieldsValue({ 
            id: item.id,
            title: item.title,
            firstName: item.firstName,
            lastName: item.lastName,
            birthdate: dayjs(item.birthdate),
            nationality: item.nationality,
            idCard: item.idCard,
            idCard2: item.idCard2,
            idCard3: item.idCard3,
            idCard4: item.idCard4,
            idCard5: item.idCard5,
            gender: item.gender,
            phoneCode: item.phoneCode,
            phoneNumber: item.phoneNumber,
            passportId: item.passportId,
            expectedSalary: item.expectedSalary, 
        });
    }

    const onDeleteApplicantData = (id: any) => {
        const restApplicantData = applicantDataStore.filter((item) => item.id !== id)
        dispatch(updateApplicantData(restApplicantData.sort((a: any, b: any) => b.id - a.id)))
    }

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection: TableRowSelection<DataType> = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [
          Table.SELECTION_ALL,
          Table.SELECTION_INVERT,
          Table.SELECTION_NONE,
          {
            key: 'odd',
            text: 'Select Odd Row',
            onSelect: (changeableRowKeys) => {
              let newSelectedRowKeys = [];
              newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
                if (index % 2 !== 0) {
                  return false;
                }
                return true;
              });
              setSelectedRowKeys(newSelectedRowKeys);
            },
          },
          {
            key: 'even',
            text: 'Select Even Row',
            onSelect: (changeableRowKeys) => {
              let newSelectedRowKeys = [];
              newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
                if (index % 2 !== 0) {
                  return true;
                }
                return false;
              });
              setSelectedRowKeys(newSelectedRowKeys);
            },
          },
        ],
    };

    const onReset = () => {
        dispatch(updateEditItem({}))
        dispatch(updateIsEdit(false))
        form.resetFields();
    };

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        if (isEditStore) {
            const editItem = applicantDataStore.find((item) => item.id === applicantEditDataStore.id)
            const editItemIndex = applicantDataStore.findIndex((item) => item.id === editItem.id)
            
            const data = {
                ...values,
                key: editItem.id,
                id: editItem.id,
                fullName: `${values.title}${values.firstName} ${values.lastName}`,
                birthdate: dayjs(values.birthdate).valueOf(),
                fullPhoneNumber: `${values.phoneCode}${values.phoneNumber}`,
                fullIdCard: `${values.idCard || ''}${values.idCard2 || ''}${values.idCard3 || ''}${values.idCard4 || ''}${values.idCard5 || ''}`,
            }
            if (editItemIndex !== -1) {
                dispatch(editApplicantData({item: data, index: editItemIndex}))    
                onReset()
            }
        } else {
            const localData = localStorage.getItem('applicantData') 
            let id = 1
            
            if (localData !== null && localData.length > 0) {
                const parseData = JSON.parse(localData)
                id = parseData[0].id + 1
            }
            const data = {
                ...values,
                key: id,
                id: id,
                fullName: `${values.title}${values.firstName} ${values.lastName}`,
                birthdate: dayjs(values.birthdate).valueOf(),
                fullPhoneNumber: `${values.phoneCode}${values.phoneNumber}`,
                fullIdCard: `${values.idCard || ''}${values.idCard2 || ''}${values.idCard3 || ''}${values.idCard4 || ''}${values.idCard5 || ''}`,
            }
            const newDataList = [data, ...applicantDataStore];
            dispatch(updateApplicantData(newDataList.sort((a, b) => b.id - a.id)))
            onReset()
        }
    };
    
    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const disabledDate: RangePickerProps['disabledDate'] = (current) => {
        return current && current > dayjs().endOf('day');
    };

    const onCheckAll: CheckboxProps['onChange'] = (e) => {
     if (e.target.checked) {
        dispatch(updateIsSelectedAll(true))
        const allSelectedRowKeys: any[] = []
        applicantDataStore.map((item) => {
            allSelectedRowKeys.push(item.key)
        })
        if (allSelectedRowKeys.length > 0) {
            setSelectedRowKeys(allSelectedRowKeys);
        }
     } else {
        setSelectedRowKeys([]);
        dispatch(updateIsSelectedAll(false))
     }
    };

    const onDeleteAllApplicantData = () => {
        if (selectedRowKeys.length > 0) {
            const restApplicantData = applicantDataStore.filter((item) => !selectedRowKeys.includes(item.id))
            dispatch(updateApplicantData(restApplicantData.sort((a: any, b: any) => b.id - a.id)))
            dispatch(updateIsSelectedAll(false))
        } else if (isSelectedAllStore) {
            dispatch(updateApplicantData([]))
            dispatch(updateIsSelectedAll(false))
        }
    }

    return (
        <Flex vertical={true}>
            <div style={{ margin: '20px auto 0', width: '60%', border: '1px solid black', borderRadius: '10px', padding: '20px'}}>
                <Form
                    form={form}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Row>
                        <Col span={i18n.language === 'th' ? 4 : 3}>
                            <Form.Item<FieldType>
                                label={i18n.t('TestTwo.TitleName')}
                                name="title"
                                rules={[{ required: true, message: i18n.t('TestTwo.TitleNameRequired') }]}
                                wrapperCol={{ span: i18n.language === 'th' ? 10 : 12}}
                            >
                            <Select placeholder={i18n.t('TestTwo.TitleName')}>
                                <Select.Option value={i18n.t('TestTwo.TitleNameMR')}>{i18n.t('TestTwo.TitleNameMR')}</Select.Option>
                                <Select.Option value={i18n.t('TestTwo.TitleNameMS')}>{i18n.t('TestTwo.TitleNameMS')}</Select.Option>
                                <Select.Option value={i18n.t('TestTwo.TitleNameMRS')}>{i18n.t('TestTwo.TitleNameMRS')}</Select.Option>
                            </Select>
                            </Form.Item>
                        </Col>
                        
                        <Col span={i18n.language === 'th' ? 10 : 11}>
                            <Form.Item<FieldType>
                                label={i18n.t('TestTwo.FirstName')}
                                name="firstName"
                                rules={[{ required: true, message: i18n.t('TestTwo.FirstNameRequired')}]}
                                wrapperCol={{ span: i18n.language === 'th' ? 20 : 19}}
                            >
                            <Input placeholder={i18n.t('TestTwo.FirstNamePlaceholder')}/>
                            </Form.Item>
                        </Col>
                        <Col span={10}>
                            <Form.Item<FieldType>
                                label={i18n.t('TestTwo.LastName')}
                                name="lastName"
                                rules={[{ required: true, message: i18n.t('TestTwo.LastNameRequired') }]}
                                wrapperCol={{ span: 20}}
                            >
                                <Input placeholder={i18n.t('TestTwo.LastNamePlaceholder')} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={i18n.language === 'th' ? 5 : 6}>
                            <Form.Item<FieldType>
                                label={i18n.t('TestTwo.Birthdate')}
                                name="birthdate"
                                rules={[{ required: true, message: i18n.t('TestTwo.BirthdateRequired') }]}
                                wrapperCol={{ span: 16}}
                            >
                                <DatePicker placeholder={i18n.t('TestTwo.BirthdatePlaceholder')} format={'DD/MM/BBBB'} disabledDate={disabledDate}/>
                            </Form.Item>
                        </Col>
                        
                        <Col span={10}>
                            <Form.Item<FieldType>
                                label={i18n.t('TestTwo.Nationality')}
                                name="nationality"
                                rules={[{ required: true, message: i18n.t('TestTwo.NationalityRequired') }]}
                                wrapperCol={{ span: 20}}
                            >
                                <Input placeholder={i18n.t('TestTwo.NationalityPlaceholder')}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={i18n.language === 'th' ? 4 : 3}>
                            <Form.Item<FieldType>
                                label={i18n.t('TestTwo.IdCard')}
                                name="idCard"
                            >
                                <Input  placeholder='x' maxLength={1} />
                            </Form.Item>
                        </Col>
                        <span style={{ display: 'inline-block', width: '24px', lineHeight: '26px', textAlign: 'center', fontSize: '30px' }}>-</span>
                        <Col span={2}>
                            <Form.Item<FieldType>
                                name="idCard2"
                            >
                                <Input  placeholder='xxxx' maxLength={4} />
                            </Form.Item>
                        </Col>
                        <span style={{ display: 'inline-block', width: '24px', lineHeight: '26px', textAlign: 'center', fontSize: '30px' }}>-</span>
                        <Col span={2}>
                            <Form.Item<FieldType>
                                name="idCard3"
                            >
                                <Input  placeholder='xxxxx' maxLength={5} />
                            </Form.Item>
                        </Col>
                        <span style={{ display: 'inline-block', width: '24px', lineHeight: '26px', textAlign: 'center', fontSize: '30px' }}>-</span>
                        <Col span={1}>
                            <Form.Item<FieldType>
                                name="idCard4"
                            >
                                <Input  placeholder='xx' maxLength={2} />
                            </Form.Item>
                        </Col>
                        <span style={{ display: 'inline-block', width: '24px', lineHeight: '26px', textAlign: 'center', fontSize: '30px' }}>-</span>
                        <Col span={1}>
                            <Form.Item<FieldType>
                                name="idCard5"
                            >
                                <Input  placeholder='x' maxLength={1} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={i18n.language === 'th' ? 6 : 8}>
                            <Form.Item<FieldType>
                                label={i18n.t('TestTwo.Gender')}
                                name="gender"
                                rules={[{ required: true, message: 'กรุณาเลือกเพศ' }]}
                            >
                                <Radio.Group>
                                    <Radio value="ชาย">{i18n.t('TestTwo.Male')}</Radio>
                                    <Radio value="หญิง">{i18n.t('TestTwo.Female')}</Radio>
                                    <Radio value="ไม่ระบุ">{i18n.t('TestTwo.NotSpecified')}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={i18n.language === 'th' ? 6 : 5}>
                            <Form.Item<FieldType>
                                name="phoneCode"
                                label={i18n.t('TestTwo.PhoneNumber')}
                                rules={[{ required: true, message: i18n.t('TestTwo.PhoneCodeRequired') }]}
                                wrapperCol={{ span: 12}}
                            >
                                <Select placeholder="Ex. +66">
                                    {
                                        countryPhoneCodes.map((item, index) => (
                                            <Select.Option key={index} value={`+${item.code}`}>{item.iso} (+{item.code})</Select.Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                        <span style={{ display: 'inline-block', width: '24px', lineHeight: '26px', textAlign: 'center', fontSize: '30px' }}>-</span>
                        <Col span={6}>
                            <Form.Item<FieldType>
                                name="phoneNumber"
                                rules={[{ required: true, message: i18n.t('TestTwo.PhoneNumberRequired') }]}
                            >
                                <Input style={{ width: '100%' }} placeholder='Ex. 812345678' maxLength={9} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={10}>
                            <Form.Item<FieldType>
                                label={i18n.t('TestTwo.Passport')}
                                name="passportId"
                                wrapperCol={{ span: 16}}
                            >
                            <Input placeholder='Ex. AA123456 / AA1234567' />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item<FieldType>
                                label={i18n.t('TestTwo.ExpectedSalary')}
                                name="expectedSalary"
                                rules={[{ required: true, message: i18n.t('TestTwo.ExpectedSalaryRequired') }]}
                                wrapperCol={{ span: 16}}
                            >
                            <Input placeholder='Ex. 50000' />
                            </Form.Item>
                        </Col>
                        <Col span={4} push={2}>
                            <Button type="default" htmlType="button" onClick={onReset}>
                                {i18n.t('TestTwo.ResetData')}
                            </Button>
                        </Col>
                        <Col span={4} push={2}>
                            <Button type="default" htmlType="submit">
                                {isEditStore ? i18n.t('TestTwo.EditData') :  i18n.t('TestTwo.SubmitData')}
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
            <div style={{ width: '90%', margin: '50px auto 0',}}>
                <Flex style={{ alignItems: 'center', marginBottom: '20px', justifyContent: 'space-between'}}>
                    <Flex style={{ alignItems: 'center'}}>
                        <Checkbox disabled={applicantDataStore.length === 0 || isEditStore} checked={isSelectedAllStore} onChange={onCheckAll}>{i18n.t('TestTwo.SelectAll')}</Checkbox>
                        <Popconfirm
                            title={i18n.t('TestTwo.TitlePopupDeleteAll')}
                            description={i18n.t('TestTwo.DetailPopupDeleteAll')}
                            okText={i18n.t('TestTwo.ConfirmPopupDeleteAll')}
                            onConfirm={onDeleteAllApplicantData}
                            cancelText={i18n.t('TestTwo.CancelPopupDeleteAll')}
                        >
                            <Button disabled={(!isSelectedAllStore && selectedRowKeys.length === 0) || isEditStore}>{i18n.t('TestTwo.DeleteAll')}</Button>
                        </Popconfirm>
                    </Flex>
                        <Button onClick={() => dispatch(addMultipleApplicantData())}>{i18n.t('TestTwo.AddExample')}</Button>
                </Flex>
                <Table rowSelection={rowSelection} pagination={{ pageSize: 5, position: ['bottomCenter']}} columns={columns} dataSource={applicantDataStore} />
            </div>
        </Flex>
    );
}

export default DetailTestTwo;
