"use client";
import React, { Key, useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Select,
  Table,
  Space,
  Popconfirm,
  Radio,
  DatePicker,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import { RootState } from "@/redux/store";
import {
  addItem,
  updateItem,
  deleteItem,
  deleteMany,
  loadFromLocal,
} from "@/redux/slices/storageSlice";
import { nanoid } from "nanoid";
import styles from "@/app/scss/storage.module.scss";
import Link from "next/link";
import PhoneInput from "antd-phone-input";
import dayjs from "dayjs";

export default function Page() {
  const tTable = useTranslations("Table");
  const tForm = useTranslations("Form");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadFromLocal());
  }, [dispatch]);

  const items = useSelector((state: RootState) => state.storage.items);

  console.log("items:", items);

  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    if (editingItem) {
      dispatch(
        updateItem({
          ...values,
          id: editingItem.id,
        })
      );
      setEditingItem(null);
    } else {
      dispatch(
        addItem({
          id: nanoid(),
          ...values,
        })
      );
      // console.log("values >>>>", values);
    }

    form.resetFields();
  };

  const onEdit = (record: any) => {
    // console.log("record", record);
    setEditingItem(record);
    form.setFieldsValue({
      ...record,
      birthday: record.birthday ? dayjs(record.birthday) : null,
      mobile: {
        countryCode: record.mobile.countryCode,
        areaCode: record.mobile.areaCode,
        phoneNumber: record.mobile.phoneNumber,
        isoCode: record.mobile.isoCode,
      },
    });
  };

  const onDelete = (id: string) => {
    dispatch(deleteItem(id));
  };

  const deleteSelected = () => {
    dispatch(deleteMany(selectedRowKeys as string[]));
    setSelectedRowKeys([]);
  };

  const columns = [
    {
      title: tTable("name"),
      render: (record: any) =>
        `${tTable(record.hname)} ${record.fname} ${record.lname}`,
    },
    {
      title: tTable("birthday"),
      render: (record: any) => dayjs(record.birthday).format("DD-MM-YYYY"),
    },
    {
      title: tTable("gender"),
      render: (record: any) => `${tTable(record.gender)}`,
    },
    {
      title: tTable("mobile"),
      render: (record: any) => {
        const m = record.mobile;
        if (!m) return "-";
        return `+${m.countryCode} ${m.areaCode}${m.phoneNumber}`;
      },
    },
    {
      title: tTable("citizenid"),
      dataIndex: "citizenid",
      render: (value: any) => (value ? value : "-"),
    },
    {
      title: tTable("nationality"),
      render: (record: any) => `${tTable(record.nationality)}`,
    },
    {
      title: tTable("passportno"),
      dataIndex: "passportno",
      render: (value: any) => (value ? value : "-"),
    },
    {
      title: tTable("salary"),
      dataIndex: "salary",
      render: (value: any) =>
        value ? new Intl.NumberFormat("en-US").format(Number(value)) : "-",
    },
    {
      title: tTable("action"),
      render: (_: any, record: any) => (
        <Space>
          <Button onClick={() => onEdit(record)}>{tTable("edit")}</Button>

          <Popconfirm
            title={tTable("confirmDelete")}
            onConfirm={() => onDelete(record.id)}
            okText={tTable("yes")}
            cancelText={tTable("no")}
          >
            <Button danger>{tTable("delete")}</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className={styles.page}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <h1>{tForm("title")}</h1>
        <Link
          href="/"
          style={{
            background: "white",
            borderRadius: "4px",
            padding: "5px 10px",
          }}
        >
          {tTable("home")}
        </Link>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "auto",
          width: "75%",
        }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          style={{ marginBottom: "30px", width: "100%" }}
          size="large"
        >
          <Form.Item label={null} style={{ marginBottom: 0 }}>
            <Form.Item
              label={tForm("hname")}
              name="hname"
              rules={[{ required: true, message: tForm("required") }]}
              style={{
                display: "inline-block",
                width: "calc(20% - 8px)",
                marginRight: "8px",
              }}
            >
              <Select
                options={[
                  { label: tForm("mr"), value: "mr" },
                  { label: tForm("mrs"), value: "mrs" },
                  { label: tForm("ms"), value: "ms" },
                ]}
              />
            </Form.Item>

            <Form.Item
              label={tForm("name")}
              name="fname"
              rules={[{ required: true, message: tForm("required") }]}
              style={{
                display: "inline-block",
                width: "calc(40% - 8px)",
              }}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={tForm("lname")}
              name="lname"
              rules={[{ required: true, message: tForm("required") }]}
              style={{
                display: "inline-block",
                width: "calc(40% - 8px)",
                marginLeft: "8px",
              }}
            >
              <Input />
            </Form.Item>
          </Form.Item>

          <Form.Item label={null} style={{ marginBottom: 0 }}>
            <Form.Item
              label={tForm("birthday")}
              name="birthday"
              rules={[{ required: true, message: tForm("required") }]}
              style={{
                display: "inline-block",
                width: "calc(20% - 8px)",
                marginRight: "8px",
              }}
            >
              <DatePicker style={{ width: "100%" }} format="DD-MM-YYYY" />
            </Form.Item>

            <Form.Item
              label={tForm("nationality")}
              name="nationality"
              rules={[{ required: true, message: tForm("required") }]}
              style={{
                display: "inline-block",
                width: "20%",
              }}
            >
              <Select
                options={[
                  { label: tForm("thai"), value: "thai" },
                  { label: tForm("french"), value: "french" },
                  { label: tForm("american"), value: "american" },
                ]}
              />
            </Form.Item>
          </Form.Item>

          <Form.Item label={tForm("citizenid")} name="citizenid">
            <Input.OTP
              length={13}
              inputMode="numeric"
              separator={<span>-</span>}
            />
          </Form.Item>

          <Form.Item
            label={tForm("gender")}
            name="gender"
            rules={[{ required: true, message: tForm("required") }]}
          >
            <Radio.Group
              options={[
                { label: tForm("male"), value: "male" },
                { label: tForm("female"), value: "female" },
                { label: tForm("unsex"), value: "unsex" },
              ]}
            />
          </Form.Item>

          <Form.Item
            label={tForm("mobile")}
            name="mobile"
            rules={[{ required: true, message: tForm("required") }]}
          >
            <PhoneInput enableArrow enableSearch />
          </Form.Item>

          <Form.Item label={tForm("passportno")} name="passportno">
            <Input />
          </Form.Item>

          <Form.Item
            label={tForm("salary")}
            name="salary"
            rules={[{ required: true, message: tForm("required") }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: 10 }}
            >
              {editingItem ? tForm("update") : tForm("create")}
            </Button>

            <Button
              onClick={() => {
                setEditingItem(null);
                form.resetFields();
              }}
            >
              {editingItem ? tForm("cancel") : tForm("reset")}
            </Button>
          </Form.Item>
        </Form>
      </div>

      <Button danger onClick={deleteSelected} style={{ marginBottom: 16 }}>
        {tTable("deleteSelected")} ({selectedRowKeys.length})
      </Button>

      <Table
        rowKey="id"
        dataSource={items}
        columns={columns}
        pagination={{ pageSize: 2 }}
        rowSelection={{
          selectedRowKeys,
          onChange: setSelectedRowKeys,
        }}
      />
    </div>
  );
}
