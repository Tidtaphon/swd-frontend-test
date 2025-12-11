"use client";
import React, { useState } from "react";
import { Card, Col, Divider, Row } from "antd";
import styles from "@/app/scss/custom-layout.module.scss";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Page() {
  const t = useTranslations("Layout");

  const [shapes, setShapes] = useState([
    "square",
    "circle",
    "ellipse",
    "trapezoid",
    "rectangle",
    "parallelogram",
  ]);

  const shiftLeft = () => {
    setShapes((prev) => [...prev.slice(1), prev[0]]);
  };

  const shiftRight = () => {
    setShapes((prev) => [
      prev[prev.length - 1],
      ...prev.slice(0, prev.length - 1),
    ]);
  };

  const swapRows = () => {
    const row1 = shapes.slice(0, 3);
    const row2 = shapes.slice(3, 6);
    setShapes([...row2, ...row1]);
  };

  const random = () => {
    const newShapes = [...shapes];
    for (let i = newShapes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newShapes[i], newShapes[j]] = [newShapes[j], newShapes[i]];
    }
    setShapes(newShapes);
  };

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
        <h1>{t("title")}</h1>
        <Link
          href="/"
          style={{
            background: "white",
            borderRadius: "4px",
            padding: "5px 10px",
          }}
        >
          {t("home")}
        </Link>
      </div>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card className={styles.card} onClick={shiftLeft}>
            <div className={styles["page__shape-layout"]}>
              <div className={styles.triangle_l}></div>
            </div>
            <div className={styles["card__layout-txt"]}>{t("move1")}</div>
          </Card>
        </Col>
        <Col span={12}>
          <Card className={styles.card} onClick={swapRows}>
            <div className={styles["page__shape-layout"]}>
              <div className={styles.triangle_b}></div>
              <div className={styles.triangle_t}></div>
            </div>
            <div className={styles["card__layout-txt"]}>{t("move2")}</div>
          </Card>
        </Col>
        <Col span={6}>
          <Card className={styles.card} onClick={shiftRight}>
            <div className={styles["page__shape-layout"]}>
              <div className={styles.triangle_r}></div>
            </div>
            <div className={styles["card__layout-txt"]}>{t("move1")}</div>
          </Card>
        </Col>
      </Row>

      <Divider />

      <div className={styles.layoutGrid}>
        {shapes.map((s: any, i: number) => (
          <div key={i} className={styles.itemBox} onClick={() => random()}>
            <div className={styles[s]}></div>
          </div>
        ))}
      </div>
    </div>
  );
}
