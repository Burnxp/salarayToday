
export function LohnrechnerFIGMA() {
    return (
<>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
  <link rel="stylesheet" href="styleFigma.css" />
  <div className="lohnRechnerLogo">
    <img src="public/images/lohnrechner-logo.svg" alt="lohnrechner-logo" />
  </div>
  <div className="link impressum-link">
    <a href="impressum.html">Impressum</a>
  </div>
  <div className="link datenschutz-link">
    <a href="datenschutz.html">Datenschutz</a>
  </div>
  <button className="hilfe-button">Hilfe</button>
  <div className="schicht">
    <h4>Schicht:</h4>
    <div className="schicht-button">
      <button className="frueh" onclick="schichtSelect('.frueh')">
        Früh
      </button>
      <button className="spaet" onclick="schichtSelect('.spaet')">
        Spät
      </button>
      <button className="nacht" onclick="schichtSelect('.nacht')">
        Nacht
      </button>
    </div>
  </div>
  <div className="pause-div">
    <h4>Pause:</h4>
    <span>(unbezahlt 30min)</span>
  </div>
  <label className="pause-checkbox">
    <input type="checkbox" />
    {/* dein Checkbox-SVG */}
    <svg
      className="checkbox-unchecked"
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
    >
      <rect
        x={1}
        y={1}
        width={18}
        height={18}
        fill="#BCE6B9"
        stroke="#0B3309"
        strokeWidth={2}
      />
    </svg>
    {/* dein Haken-SVG */}
    <svg
      className="check"
      xmlns="http://www.w3.org/2000/svg"
      width={17}
      height={16}
      viewBox="0 0 17 16"
      fill="none"
    >
      <path
        d="M5.56067 12.9076L1.06067 8.40762L6.06067 13.4076L15.5607 0.907623"
        stroke="#0B3309"
        strokeWidth={3}
      />
    </svg>
  </label>
  <div className="tageszuschlag">
    <h4 className="text">Tageszuschlag:</h4>
    {/* Tageszuschlag 1 */}
    <label className="tageszuschlag-checkbox">
      <span className="text">1</span>
      <input type="checkbox" />
      {/* dein Checkbox-SVG */}
      <svg
        className="checkboxTageszuschlag-unchecked"
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        viewBox="0 0 20 20"
        fill="none"
      >
        <rect
          x={1}
          y={1}
          width={18}
          height={18}
          fill="#BCE6B9"
          stroke="#0B3309"
          strokeWidth={2}
        />
      </svg>
      {/* dein Haken-SVG */}
      <svg
        className="checkTageszuschlag"
        xmlns="http://www.w3.org/2000/svg"
        width={17}
        height={16}
        viewBox="0 0 17 16"
        fill="none"
      >
        <path
          d="M5.56067 12.9076L1.06067 8.40762L6.06067 13.4076L15.5607 0.907623"
          stroke="#0B3309"
          strokeWidth={3}
        />
      </svg>
    </label>
    {/* Tageszuschlag 1/2 */}
    <label className="tageszuschlagHalf-checkbox">
      <span className="text">½</span>
      <input type="checkbox" />
      {/* dein Checkbox-SVG */}
      <svg
        className="checkboxTageszuschlagHalf-unchecked"
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        viewBox="0 0 20 20"
        fill="none"
      >
        <rect
          x={1}
          y={1}
          width={18}
          height={18}
          fill="#BCE6B9"
          stroke="#0B3309"
          strokeWidth={2}
        />
      </svg>
      {/* dein Haken-SVG */}
      <svg
        className="checkTageszuschlagHalf"
        xmlns="http://www.w3.org/2000/svg"
        width={17}
        height={16}
        viewBox="0 0 17 16"
        fill="none"
      >
        <path
          d="M5.56067 12.9076L1.06067 8.40762L6.06067 13.4076L15.5607 0.907623"
          stroke="#0B3309"
          strokeWidth={3}
        />
      </svg>
    </label>
  </div>
  <div className="arbeitszeit-datum-zeit">
    <h4 className="arbeitszeit">Arbeitszeit:</h4>
    <h5 className="datum">Datum:</h5>
    <input className="workDate" type="date" defaultValue="2025-11-20" />
    <h5 className="zeit">Zeit:</h5>
    <div>
      <input className="workTimeFrom" type="time" defaultValue="07:00" />
      <span className="bis-text">bis</span>
      <input className="workTimeTo" type="time" defaultValue="15:30" />
    </div>
  </div>
  <button className="berechnen-button">Berechnen</button>
  <div className="ergebnisse">
    <div
      data-layer="Ergebnisse"
      className="Ergebnisse"
      style={{ width: 340, height: 170, position: "relative" }}
    >
      <div
        data-layer="Arbeitszeit Std"
        className="ArbeitszeitStd"
        style={{
          width: 144,
          height: 50,
          left: 0,
          top: 0,
          position: "absolute",
          boxShadow: "0px 0px 12px #366633 inset"
        }}
      >
        <div
          data-layer="Rectangle 7"
          className="Rectangle7"
          style={{
            width: 144,
            height: 50,
            left: 0,
            top: 0,
            position: "absolute"
          }}
        >
          <div
            data-layer="Rectangle 7"
            className="Rectangle7"
            style={{
              width: 144,
              height: 50,
              left: 0,
              top: 0,
              position: "absolute",
              background: "var(--Hintergrund, #BCE6B9)",
              borderRadius: 10,
              outline: "2px var(--Color-Marker, #0B3309) solid"
            }}
          />
        </div>
        <div
          data-layer="123 Std"
          className="Std"
          style={{
            left: 37,
            top: "-1px",
            position: "absolute",
            textAlign: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            color: "var(--Color-1, #366633)",
            fontSize: 15,
            fontFamily: "Source Sans Pro",
            fontWeight: 400,
            wordWrap: "break-word"
          }}
        >
          Arbeitszeit:
        </div>
        <div
          data-layer="€"
          style={{
            width: 79,
            height: 17,
            left: 36,
            top: 25,
            position: "absolute",
            textAlign: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            color: "var(--Color-Marker, #0B3309)",
            fontSize: 20,
            fontFamily: "Source Sans Pro",
            fontWeight: 400,
            wordWrap: "break-word"
          }}
        >
          7,75 std
        </div>
      </div>
      <div
        data-layer="Arbeitslohn - Zeit"
        className="ArbeitslohnZeit"
        style={{
          width: 144,
          height: 50,
          left: 196,
          top: 0,
          position: "absolute",
          boxShadow: "0px 0px 12px #366633 inset"
        }}
      >
        <div
          data-layer="Rectangle 7"
          className="Rectangle7"
          style={{
            width: 144,
            height: 50,
            left: 0,
            top: 0,
            position: "absolute"
          }}
        >
          <div
            data-layer="Rectangle 7"
            className="Rectangle7"
            style={{
              width: 144,
              height: 50,
              left: 0,
              top: 0,
              position: "absolute",
              background: "var(--Hintergrund, #BCE6B9)",
              borderRadius: 10,
              outline: "2px var(--Color-Marker, #0B3309) solid"
            }}
          />
        </div>
        <div
          data-layer="123 Std"
          className="Std"
          style={{
            left: 38,
            top: 0,
            position: "absolute",
            textAlign: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            color: "var(--Color-1, #366633)",
            fontSize: "13.50px",
            fontFamily: "Source Sans Pro",
            fontWeight: 400,
            wordWrap: "break-word"
          }}
        >
          Arbeitslohn:
        </div>
        <div
          data-layer="€"
          style={{
            width: 79,
            height: 17,
            left: 36,
            top: 25,
            position: "absolute",
            textAlign: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            color: "var(--Color-Marker, #0B3309)",
            fontSize: 20,
            fontFamily: "Source Sans Pro",
            fontWeight: 400,
            wordWrap: "break-word"
          }}
        >
          77,50 €
        </div>
      </div>
      <div
        data-layer="Nachtzuschlag"
        className="Nachtzuschlag"
        style={{
          width: 109,
          height: 50,
          left: 0,
          top: 60,
          position: "absolute",
          boxShadow: "0px 0px 12px #366633 inset"
        }}
      >
        <div
          data-layer="Rectangle 7"
          className="Rectangle7"
          style={{
            width: 109,
            height: 50,
            left: 0,
            top: 0,
            position: "absolute"
          }}
        >
          <div
            data-layer="Rectangle 7"
            className="Rectangle7"
            style={{
              width: 109,
              height: 50,
              left: 0,
              top: 0,
              position: "absolute",
              background: "var(--Hintergrund, #BCE6B9)",
              borderRadius: 10,
              outline: "2px var(--Color-Marker, #0B3309) solid"
            }}
          />
        </div>
        <div
          data-layer="123 Std"
          className="Std"
          style={{
            left: 12,
            top: 0,
            position: "absolute",
            textAlign: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            color: "var(--Color-1, #366633)",
            fontSize: "13.50px",
            fontFamily: "Source Sans Pro",
            fontWeight: 400,
            wordWrap: "break-word"
          }}
        >
          Nachtzuschlag:
        </div>
        <div
          data-layer="€"
          style={{
            width: 79,
            height: 17,
            left: 19,
            top: 25,
            position: "absolute",
            textAlign: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            color: "var(--Color-Marker, #0B3309)",
            fontSize: 20,
            fontFamily: "Source Sans Pro",
            fontWeight: 400,
            wordWrap: "break-word"
          }}
        >
          €
        </div>
      </div>
      <div
        data-layer="Sonntagszuschlag"
        className="Sonntagszuschlag"
        style={{
          width: 109,
          height: 50,
          left: 115,
          top: 60,
          position: "absolute",
          boxShadow: "0px 0px 12px #366633 inset"
        }}
      >
        <div
          data-layer="Rectangle 7"
          className="Rectangle7"
          style={{
            width: 109,
            height: 50,
            left: 0,
            top: 0,
            position: "absolute"
          }}
        >
          <div
            data-layer="Rectangle 7"
            className="Rectangle7"
            style={{
              width: 109,
              height: 50,
              left: 0,
              top: 0,
              position: "absolute",
              background: "var(--Hintergrund, #BCE6B9)",
              borderRadius: 10,
              outline: "2px var(--Color-Marker, #0B3309) solid"
            }}
          />
        </div>
        <div
          data-layer="123 Std"
          className="Std"
          style={{
            left: 2,
            top: 0,
            position: "absolute",
            textAlign: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            color: "var(--Color-1, #366633)",
            fontSize: "13.50px",
            fontFamily: "Source Sans Pro",
            fontWeight: 400,
            wordWrap: "break-word"
          }}
        >
          Sonntagszuschlag:
        </div>
        <div
          data-layer="€"
          style={{
            width: 79,
            height: 17,
            left: 19,
            top: 25,
            position: "absolute",
            textAlign: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            color: "var(--Color-Marker, #0B3309)",
            fontSize: 20,
            fontFamily: "Source Sans Pro",
            fontWeight: 400,
            wordWrap: "break-word"
          }}
        >
          €
        </div>
      </div>
      <div
        data-layer="Feiertagszuschlag"
        className="Feiertagszuschlag"
        style={{
          width: 109,
          height: 50,
          left: 231,
          top: 60,
          position: "absolute",
          boxShadow: "0px 0px 12px #366633 inset"
        }}
      >
        <div
          data-layer="Rectangle 7"
          className="Rectangle7"
          style={{
            width: 109,
            height: 50,
            left: 0,
            top: 0,
            position: "absolute"
          }}
        >
          <div
            data-layer="Rectangle 7"
            className="Rectangle7"
            style={{
              width: 109,
              height: 50,
              left: 0,
              top: 0,
              position: "absolute",
              background: "var(--Hintergrund, #BCE6B9)",
              borderRadius: 10,
              outline: "2px var(--Color-Marker, #0B3309) solid"
            }}
          />
        </div>
        <div
          data-layer="123 Std"
          className="Std"
          style={{
            left: 5,
            top: 0,
            position: "absolute",
            textAlign: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            color: "var(--Color-1, #366633)",
            fontSize: "13.50px",
            fontFamily: "Source Sans Pro",
            fontWeight: 400,
            wordWrap: "break-word"
          }}
        >
          Feiertagszuschlag
        </div>
        <div
          data-layer="€"
          style={{
            width: 79,
            height: 17,
            left: 19,
            top: 25,
            position: "absolute",
            textAlign: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            color: "var(--Color-Marker, #0B3309)",
            fontSize: 20,
            fontFamily: "Source Sans Pro",
            fontWeight: 400,
            wordWrap: "break-word"
          }}
        >
          €
        </div>
      </div>
      <div
        data-layer="Lohn m. Zuschlägen"
        className="LohnMZuschlGen"
        style={{
          width: 149,
          height: 50,
          left: 191,
          top: 120,
          position: "absolute",
          boxShadow: "0px 0px 12px #366633 inset"
        }}
      >
        <div
          data-layer="Rectangle 7"
          className="Rectangle7"
          style={{
            width: 149,
            height: 50,
            left: 0,
            top: 0,
            position: "absolute"
          }}
        >
          <div
            data-layer="Rectangle 7"
            className="Rectangle7"
            style={{
              width: 149,
              height: 50,
              left: 0,
              top: 0,
              position: "absolute",
              background: "var(--Hintergrund, #BCE6B9)",
              borderRadius: 10,
              outline: "2px var(--Color-Marker, #0B3309) solid"
            }}
          />
        </div>
        <div
          data-layer="123 Std"
          className="Std"
          style={{
            left: 19,
            top: 0,
            position: "absolute",
            textAlign: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            color: "var(--Color-1, #366633)",
            fontSize: "13.50px",
            fontFamily: "Source Sans Pro",
            fontWeight: 400,
            wordWrap: "break-word"
          }}
        >
          Lohn m. Zuschlägen
        </div>
        <div
          data-layer="€"
          style={{
            width: 79,
            height: 17,
            left: 39,
            top: 25,
            position: "absolute",
            textAlign: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            color: "var(--Color-Marker, #0B3309)",
            fontSize: 20,
            fontFamily: "Source Sans Pro",
            fontWeight: 400,
            wordWrap: "break-word"
          }}
        >
          €
        </div>
      </div>
      <div
        data-layer="Zu- Gesamt"
        className="ZuGesamt"
        style={{
          width: 144,
          height: 50,
          left: 0,
          top: 120,
          position: "absolute",
          boxShadow: "0px 0px 12px #366633 inset"
        }}
      >
        <div
          data-layer="Rectangle 7"
          className="Rectangle7"
          style={{
            width: 144,
            height: 50,
            left: 0,
            top: 0,
            position: "absolute"
          }}
        >
          <div
            data-layer="Rectangle 7"
            className="Rectangle7"
            style={{
              width: 144,
              height: 50,
              left: 0,
              top: 0,
              position: "absolute",
              background: "var(--Hintergrund, #BCE6B9)",
              borderRadius: 10,
              outline: "2px var(--Color-Marker, #0B3309) solid"
            }}
          />
        </div>
        <div
          data-layer="123 Std"
          className="Std"
          style={{
            left: 17,
            top: 0,
            position: "absolute",
            textAlign: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            color: "var(--Color-1, #366633)",
            fontSize: "13.50px",
            fontFamily: "Source Sans Pro",
            fontWeight: 400,
            wordWrap: "break-word"
          }}
        >
          Zuschläge - Gesamt
        </div>
        <div
          data-layer="€"
          style={{
            width: 79,
            height: 17,
            left: 36,
            top: 25,
            position: "absolute",
            textAlign: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            color: "var(--Color-Marker, #0B3309)",
            fontSize: 20,
            fontFamily: "Source Sans Pro",
            fontWeight: 400,
            wordWrap: "break-word"
          }}
        >
          €
        </div>
      </div>
    </div>
  </div>
  <nav className="navigation">
    <a className="navigation-link lohnrechnerSeite active" href="#">
      Lohnrechner
    </a>
    <a className="navigation-link einstellungenSeite" href="#">
      Einstellungen
    </a>
  </nav>
</>)
}