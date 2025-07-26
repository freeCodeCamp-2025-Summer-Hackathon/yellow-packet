import "../styles/HelpModal.css"

export default function SignUpHelpModal(){

    return(
        <div className="help-modal-container">
            <h2 className="help-modal-question">1. What do I need to create an account?</h2>
            <p className="help-modal-answer">You’ll need to enter your name, a valid email address, and a secure password (twice to confirm). Then click "Sign-Up with Email".</p>
            <h2 className="help-modal-question">2. Why do I have to confirm my password?</h2>
            <p className="help-modal-answer">Confirming your password helps make sure you didn’t make a typo in the first field — it protects your account from accidental errors.</p>
            <h2 className="help-modal-question">3. Can I use this form to sign up as a shelter?</h2>
            <p className="help-modal-answer">No. If you're a shelter looking to join PetMatch, please contact us directly. Shelter accounts require manual approval and cannot be created through this public sign-up form.</p>

        </div>
    );
}