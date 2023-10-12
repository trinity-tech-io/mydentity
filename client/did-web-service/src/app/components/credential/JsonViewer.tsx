import React from 'react';
import { JSONObject, JSONValue } from "@model/json";

interface JsonViewerProps {
  data: JSONObject;
}

export function JsonViewer({ data }: JsonViewerProps): React.ReactElement {
  const renderJson = (json: JSONValue): React.ReactNode => {
    if (typeof json === 'object' && json !== null) {
      if (Array.isArray(json)) {
        return (
          <div className="json-array">
            {json.map((item, index) => (
              <div key={index}>
                {renderJson(item)}
              </div>
            ))}
          </div>
        );
      } else {
        const keys = Object.keys(json);
        return (
          <div className="json-object">
            {keys.map((key) => (
              <div key={key}>
                <span className="json-key">{key}：</span> {renderJson(json[key])}
              </div>
            ))}
          </div>
        );
      }
    } else {
      return <span className="json-value">{String(json)}</span>;
    }
  };

  return (
    <div className="json-viewer" style={{ textAlign: 'left' }}>
      {renderJson(data)}
      <style>
        {`
          .json-viewer {
            font-family: Arial, sans-serif;
          }
          .json-object, .json-array {
            list-style: none;
            padding-left: 20px;
          }
          .json-key {
            font-weight: bold;
          }
        `}
      </style>
    </div>
  );
}