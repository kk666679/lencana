import { neon } from '@neondatabase/serverless';

export default function CommentForm() {
  async function create(formData) {
    'use server';
    const sql = neon(process.env.DATABASE_URL);
    const comment = formData.get('comment');
    await sql('INSERT INTO comments (comment) VALUES ($1)', [comment]);
  }

  return (
    <form action={create} className="space-y-4 p-4 border rounded">
      <input 
        type="text" 
        placeholder="Write a comment" 
        name="comment"
        className="w-full p-2 border rounded"
        required
      />
      <button 
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
}