import { format, compareAsc } from 'date-fns';
import { Link, router } from '@inertiajs/react';

export default function ShowVote({ user, vote, author, answers, isVoted }) {
    function deleteVote (id) {
        router.delete(route('votes.destroy', id), id);
    }
    function makeVote (voteId, answerId) {
        router.post(route('votes.makeVote', [voteId, answerId]));
    }

    const active = compareAsc(new Date(), new Date(vote.deadline)) <= 0;
    let maxAnswers = answers;
    const maxCountAnswer = maxAnswers.reduce((prev, current) => (prev.count > current.count ? prev : current));

    return (
        <div>
            {vote && 
                <div
                    className="flex flex-col space-y-5 m-5"
                >
                    <div className="text-right space-x-3 space-y-5">
                        <Link
                            href={route('votes.index')}
                            className="inline-block px-4 py-2 text-black border rounded-md hover:bg-gray-200"
                        >
                            Vissza
                        </Link>
                        {user.id === vote.author_id && active && <Link
                            href={route("votes.edit", vote.id)}
                            className="px-4 py-2 text-white bg-purple-500 rounded-md hover:bg-purple-600"
                        >
                            Szerkesztés
                        </Link>}
                        {user.id === vote.author_id && <button
                            onClick={() => {
                                if(confirm("Biztosan törölni szeretnéd ezt a szavazást?")){
                                    deleteVote(vote.id);
                                }
                            }}
                            className="px-4 py-2 text-white bg-gray-400 rounded-md hover:bg-gray-500"
                        >
                            Törlés
                        </button>}
                    </div>
                    
                    <h1 className="mx-auto text-xl text-bold">{vote.question}</h1>
                    <h2>Szerző: {author.name}</h2>
                    <h2>Utolsó módosítás: {format(vote.updated_at, 'yyyy.MM.dd H:mm')}</h2>
                    {isVoted && active && <h1 className="font-bold text-center text-red-600">Már leadtad a szavazatodat!</h1>}
                    
                    {answers && 
                        answers
                        .map((answer) => (
                            <div 
                                key={answer.id}
                                className={"space-x-3 p-5 my-5 text-left border rounded-md shadow-sm flex items-center " + ((answer.count === maxCountAnswer.count && !active) ? 'bg-green-300' : '')}
                            >
                                {!isVoted && active && <button
                                    onClick={() => {
                                        if(confirm("Biztosan leadod a szavazatodat? Mivel teljes mértékben anonim a szavazás így később nem tudod módosítnai a válaszodat.")){
                                            makeVote(vote.id, answer.id);
                                        }
                                    }}
                                    className="px-4 py-2 text-white bg-purple-400 rounded-md hover:bg-purple-500"
                                >
                                    +
                                </button>}
                                <h2>{answer.label}</h2>
                                <h2 className='text-right'>{!active && answer.count}</h2>
                            </div>
                        ))
                    }
                    
                </div>
            }
        </div>
    );
}
