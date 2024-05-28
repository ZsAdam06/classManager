import { format } from 'date-fns';
import { Link, router } from '@inertiajs/react';

export default function ShowPost({ user, post, author, comments, fileUrl, commentUrls}) {
    function deletePost (id) {
        router.delete(route('posts.destroy', id), id);
    }
    function deleteComment (id) {
        router.delete(route('comments.destroy', id), id);
    }

    function selectColor(topic) {
        return topic === 'learn' ? 'blue' : (topic === 'help' ? 'red' : (topic === 'event' ? 'green' : (topic === 'parent' ? 'orange' : ( topic === 'calendar' ? 'teal' : 'purple'))));
    }
    let color = selectColor(post.topic);

    function getSubject(c){
        return c === 'm' ? 'Matek' : (c === 'g' ? 'Magyar' : (c === 'h' ? 'Történelem' : (c === 'l' ? 'Idegen nyelv' : ( c === 's' ? 'Természettudomány' : ( c === 'o' ? 'Egyéb' : 'Összes')))));
    }

    return (
        <div>
            {post && 
                <div
                    className="flex flex-col space-y-5 m-5"
                >
                    <div className="text-right space-x-3 space-y-5">
                        <Link
                            href={route(`posts.${post.topic}`)}
                            className="inline-block px-4 py-2 text-black border rounded-md hover:bg-gray-200"
                        >
                            Vissza
                        </Link>
                        {user.id === post.user_id && <Link
                            href={route("posts.edit", post.id)}
                            className={`px-4 py-2 text-white bg-${color}-500 rounded-md hover:bg-${color}-600`}
                        >
                            Szerkesztés
                        </Link>}
                        {user.id === post.user_id && <button
                            onClick={() => {
                                if(confirm("Biztosan törölni szeretnéd ezt a bejegyzést?")){
                                    deletePost(post.id);
                                }
                            }}
                            className="px-4 py-2 text-white bg-gray-400 rounded-md hover:bg-gray-500"
                        >
                            Törlés
                        </button>}
                    </div>
                    
                    <h1 className="mx-auto text-xl">{post.title}</h1>
                    <h2 className="font-bold">Szerző: {author.name}</h2>
                    <h2 className="font-bold">Utolsó aktivitás: {format(post.updated_at, "yyyy.MM.dd H:mm")}</h2>
                    {post.topic === 'learn' && <p className="mt-2 mb-2">{getSubject(post.subject)}</p>}

                    <div>{post.description}</div>

                    {post.filename && <div>
                        Csatolt fájl:
                        <p>{post.filename}</p>
                        <div className='flex space-x-3'>
                            <a 
                                href={fileUrl}
                                download={post.filename}
                                className={`px-4 py-2 mt-4 text-white bg-${color}-500 rounded-md hover:bg-${color}-600`}
                            > 
                                Megtekint
                            </a>
                        </div>
                    </div>}

                    <div>
                        <div className='text-right'>
                            <Link
                                href={route('comments.create', post.id)}
                                className={`px-4 py-2 mt-4 text-white bg-${color}-500 rounded-md hover:bg-${color}-600`}
                            >
                                Hozzászólok
                            </Link>
                        </div>
                        {comments && 
                            comments.map((comment) => (
                                <div 
                                    key={comment.id}
                                    className="p-5 my-5 text-left border rounded-md shadow-sm"
                                >
                                    <p className="text-md font-bold">{comment.user.name} - {format(comment.updated_at, "yyyy.MM.dd H:mm")}</p>
            
                                    <p className="ml-2">{comment.description}</p>

                                    {comment.filename && <div>
                                        Csatolt fájl:
                                        <p>{comment.filename}</p>
                                        <div className='flex space-x-3'>
                                            <a 
                                                href={commentUrls[comment.id]}
                                                download={comment.filename}
                                                className={`px-4 py-2 mt-4 text-white bg-${color}-500 rounded-md hover:bg-${color}-600`}
                                            > 
                                                Megtekint
                                            </a>
                                        </div>
                                    </div>}
            
                                    <div className="text-right space-x-3 space-y-5">
                                        {user.id === comment.user_id && <Link
                                            href={route('comments.edit', comment.id)}
                                            className={`px-4 py-2 text-white bg-${color}-500 rounded-md hover:bg-${color}-600`}
                                        >
                                            Szerkesztés
                                        </Link>}
                                        {user.id === comment.user_id && <button
                                            onClick={() => {
                                                if(confirm("Biztosan törölni szeretnéd ezt a kommentet?")){
                                                    deleteComment(comment.id);
                                                }
                                            }}
                                            className="px-4 py-2 text-white bg-gray-400 rounded-md hover:bg-gray-500"
                                        >
                                            Törlés
                                        </button>}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            }
        </div>
    );
}
