# Hiropitch

Hiropitch aims to revolutionize the media and entertainment industry by leveraging blockchain technology to facilitate the discovery, evaluation, and exchange of intellectual property (IP), promoting collaboration among industry professionals.

## This project...

Hiropitch was developed after participating in the [MasterZ](https://www.masterzblockchain.com/) bootcamp, where the goal after the bootcamp was to create an MVP of a project that leveraged Solana technology, collaborating with other colleagues who also attended the bootcamp.

## Team

- Andrea Falcon - [Linkedin](https://www.linkedin.com/in/andrea-falcon-fullstack-developer/)
- Riccardo Soddu - [Linkedin](https://it.linkedin.com/in/riccardosoddu)
- Igor Sanna - [Linkedin](https://www.linkedin.com/in/igor-sanna-092b68224)

## Technologies Used

- Next.js (version 14)
- TailwindCSS
- TypeScript
- Clerk for login management
- Supabase for file uploads
- Metaplex for managing Solana NFTs
- solana/web3.js for connecting to the Solana blockchain
- Mongoose for connecting to the MongoDB database

## Env

Example file `.env.example`.

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/admin/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/admin/dashboard
MONGO_DB_URI="mongodb+srv://<username>:<password>@cluster0.6jjry.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
CLERK_WEBHOOK_SECRET=secret_from_clerk_webhooks_page
SUPABASE_PROJECT_URL=https://test.supabase.co
SUPABASE_API_KEY=testkey
SUPABASE_BUCKET=hiropitch
SOLANA_SECRET_KEY="[]"
```

## Project description

Hiropitch is a decentralized platform for managing and tokenizing intellectual property (IP). The platform offers a marketplace for buying and selling tokenized IP, SaaS integration for legal transactions, transparent IP management, and community-driven project selection and development.

## Key features

- Registration and Login: Users can register and log in via Clerk.
- Profile Update: After the first login, users can update their profile with personal and business information.
- IP Upload: Users can upload their IP, specifying the category, contract type, adding external links (e.g., YouTube videos, illustrations, texts), selecting other registered authors, adding a cover image, and a zip file with the project files.
- NFT Creation: Specify the number of NFTs to create and the cost of each. Upon saving, the data is stored in the database, an NFT collection is created on the Solana blockchain, and transaction information is saved.
- NFT Purchase: Interested users can purchase one or more NFTs from different ideas.
- NDA Acceptance: To view the details of an idea, users must accept an NDA. A collection with a single NFT is created on Solana, storing the collection information, user information, and timestamp as proof of NDA acceptance.
- Dashboard Interactions: Users can like public comments, like posts, and comment on idea details.
- Transaction History: Users have a dedicated section with a list of their transactions (NFT purchase, collection creation, NDA signing).
- Marketplace: View trending or searchable collections, with redirection to idea details.
- FAQ Page: Main questions and answers to help users.
- Community: Users can join communities dedicated to the ideas they follow, facilitating contact with creators and authors and allowing interested parties to actively participate in the community.

## Running the Project Locally

1. Clone the repository:

```bash
git clone https://github.com/your-username/hiropitch.git
cd hiropitch
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables, copy the .env.example file to .env.local and update the variable values:

```bash
cp .env.example .env.local
```

4. Start the server:

```bash
npm run dev
```

## Next steps...

- Minting NFTs: Users will have the ability to mint NFTs from the collection to support a project.
- Community Interaction: Users will be able to interact with other supporters of a project by creating and joining a community.

### License

MIT
