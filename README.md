# SHIELD SPACE
### Secure platform for sensitive communities hosting private, confidential events.
![Group 3 (2)](https://github.com/user-attachments/assets/63575754-14d0-4fea-a78c-42a62dcfa195)

**Shield Space** is a secure platform designed for organizing private, privacy-preserving events. It empowers event organizers to host safe, confidential gatherings without exposing sensitive information about attendees or event details. Ideal for communities that prioritize security, such as domestic violence survivors [Our use-case (**SafeLink**)], Shield Space ensures that personal data remains protected, allowing participants to connect and engage without fear of online harassment or unwanted exposure.

Check out our video demo - [here]().

⚙️ **Built using:** iExec, Secret Network, Bandada, Aztec, Scaffold-ETH2.

🕵️ **Private Event Creation:** Events are invisible to the public; only invited users can access event details. All event information is encrypted using Secret Network.

🔏 **Secure Verification:** Attendees can be invited using wallet address (will be notified via e-mail) using iExec tech stack. In case of further verification needed only limited and encrypted information will be shared as proof (e.g., gender, age, etc.), without needing to share full personal data using Aztec Network (zkPassport-when open sourced again).

🛑 **No Unnecessary Sharing:** Survivors’ identities are kept anonymous unless they choose to disclose more, limiting exposure to online harassment using privacy-by-default approach.

👁️ **Organizers Overview:** Only information that event organizers see is amount of (verified – if needed) participants, keeping survivors safe from unwanted visibility.

🛡️ **Harassment Prevention:** Secure communication channels/groups ensure that interactions between organizers and survivors are free from online harassment risks using Bandada groups adding a layer of privacy with a strong anti-sybil system.

![techstack-userflow](https://github.com/user-attachments/assets/e29a3761-cc65-4ce2-814b-c49232d4bc6f)

## Hackathon bounties

### ETHRome (Privacy Track)

Shield Space directly addresses critical privacy and security challenges in organizing sensitive events. Domestic violence survivors, among other sensitive groups, require protection from unwanted exposure, harassment, and data breaches. We showcase how privacy-first design can be applied to real-world issues, highlighting the importance of protecting user data in sensitive contexts.

### iExec (Web3Mail)

We use **Web3Mail** to protect email data - revealing only public addresses instead.

We leverage iExec's **Web3Mail** to enhance privacy in event communications, especially for sensitive communities. Email communications are sent using Ethereum wallet addresses, ensuring that no private email information is shared unless explicitly authorized by the user. This system allows attendees to control who (and how many times) can send them emails, providing a layer of security and privacy essential for sensitive contexts.

### Secret Network (Pool Prize)

Shield Space uses **SecretPaths**, an encryption feature within Secret Network, to protect sensitive event details until a participant is verified.

Through Secret Network's smart contracts, event details like locations, dates, and attendee lists are encrypted by default. Only verified individuals, who meet specific criteria such as identity confirmation, can decrypt and access event information. This setup ensures attendees' privacy while preventing unauthorized access to sensitive data.

### Bandada (Pool Prize)

We utilize Bandada to ensure privacy-preserving group management for event attendees and organizers.

To attend the event, participants must prove membership in the group without revealing their Ethereum address. This is achieved through the generation of a **Semaphore ID**. This system adds an extra layer of privacy, ensuring sensitive details remain secure while preventing sybil attacks.

### Aztec

Shield Space leverages Aztec's **Noir** circuits framework, to establish a secure backend for verifying sensitive attendee data without exposing it to event organizers or external parties.

We ensure that only the minimal necessary information (like gender or specific ID details) are shared, allowing for event eligibility verification while keeping other personal details encrypted and private. Meaning all transactions and interactions happen with full confidentiality, securing the identities and personal details of survivors while ensuring compliance with the event requirements.

### Build Guild (Scaffold-ETH2)

We utilize Build Guild's **Scaffold-ETH2** toolkit to create a secure platform for organizing privacy-preserving events. 

**Foundry** is used for developing and testing smart contracts, ensuring security and functionality. **Wagmi** manages wallet connections and blockchain interactions, streamlining web3 functionalities. **Viem** facilitates efficient, type-safe interactions with Ethereum nodes, enhancing responsiveness. **Next.js** serves as the frontend framework, offering server-side rendering for better performance and secure API routes. **RainbowKit** provides a user-friendly wallet connection interface, simplifying user onboarding. And **DaisyUI** is used for creating a modern, responsive design with ready-made UI components.

By integrating these tools, we ensures a secure, efficient, and user-friendly experience.

### W3PN (Best creation of a new Web3Privacy project)

We utilized the **Privacy Builder Pack** for the initial exploration and inspiration behind existing privacy-first projects. Tips & Tricks from serial hackers helped us narrow down the focus and build MVP efficiently. We believe that Shield Space can be integrated and further developed under the umbrela of Web3Privacy Now community to enable sensitive communities to set up private, and confidential events.
