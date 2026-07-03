import * as React from "react";
import { wrapFieldsWithMeta } from "tinacms";

// Sélecteur de couleur natif — borné (pas de saisie CSS libre).
export const ColorPickerInput = wrapFieldsWithMeta(({ input }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <input
        type="color"
        id={input.name}
        {...input}
        style={{
          width: 56,
          height: 40,
          padding: 2,
          border: "1px solid #e1ddec",
          borderRadius: 8,
          background: "#fff",
          cursor: "pointer",
        }}
      />
      <code style={{ fontSize: 13, color: "#6b7280" }}>{input.value}</code>
    </div>
  );
});
