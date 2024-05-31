import { notFound } from 'next/navigation';

export default function UserProfile({ params }) {
    const { username } = params;

    if (!username) {
        notFound();
    }

    return (
        <div>
            <h1>Welcome, {username}!</h1>
            <p>This is your profile page.</p>
        </div>
    );
}
