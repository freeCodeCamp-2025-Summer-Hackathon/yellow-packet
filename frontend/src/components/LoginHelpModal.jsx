import "../styles/HelpModal.css"

export default function LoginHelpModal(){

    return(
        <div className="help-modal-container">
            <h2 className="help-modal-question">1. What password should I enter here?</h2>
            <p className="help-modal-answer">Use the password you created when you signed up for your PetMatch account — not your email account password.</p>
            <h2 className="help-modal-question">2. Can I log in without a password?</h2>
            <p className="help-modal-answer">For now, the system requires both an email and password to login. Passwordless login may be added in the future.</p>
            <h2 className="help-modal-question">3. Are you a shelter trying to log in?</h2>
            <p className="help-modal-answer">If you're a shelter and don’t have a login yet, please contact us directly. Shelter accounts must be created manually and cannot be signed up through the public form.</p>

        </div>
    );
}