import Button from "../Button";
import Modal from "../Modal";
import "./style.scss";

const Alert = Modal(
  ({ message, confirmText, declineText, onConfirm, onDecline }) => (
    <div className="alert">
      <div className="alert__message">{message}</div>
      <div className="alert__buttons">
        {onConfirm && (
          <Button className="alert__button" onClick={onConfirm} secondary>
            {confirmText ? confirmText : "Confirm"}
          </Button>
        )}
        {onDecline && (
          <Button className="alert__button" onClick={onDecline} secondary>
            {declineText ? declineText : "Decline"}
          </Button>
        )}
      </div>
    </div>
  )
);

export default Alert;
