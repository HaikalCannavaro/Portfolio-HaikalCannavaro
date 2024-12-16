import ContactRounded from "./ContactRounded";
import styles from "./Contact.module.css";
import ContactTitle from "./ContactTitle";
export default function Contact() {
  return (
    <section
      id="contact"
      className={styles.contactSection}
    >
      <ContactRounded />
      <div className={styles.wrapper}>
        <div className={styles.contactContent}>
            <ContactTitle title="Projects" />
        </div>
      </div>
    </section>
  );
}