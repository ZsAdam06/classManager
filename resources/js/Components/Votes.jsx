import { format, compareAsc } from 'date-fns';
import { Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Votes({ user, votes, answers, groupId, schoolId, groupFilter, groups }) {
    let color = 'purple';

    const [active, setActive] = useState(false);

    function deleteVote (id) {
        router.delete(route('votes.destroy', id));
    }

    function isThisSchool(grId){
        let found = false;
        if(groups){
            groups.forEach(g => {
                if(g.id == grId){
                    found = true;
                }            
            });
        }
        if(found){
            return true;
        }else{
            return false;
        }
    }

    return (
        <div>
            <div className="space-x-3 space-y-3">
                <button
                    onClick={() => {setActive(true)}}
                    disabled={ active ? true : false }
                    className={`px-4 py-2 rounded-md ` + ((active == true) ? `text-black border-2 border-black bg-green-400 ` : `bg-green-500 hover:bg-green-600 text-white`)}
                >
                    Aktív
                </button>
                <button
                    onClick={() => {setActive(false)}}
                    disabled={ !active ? true : false }
                    className={`px-4 py-2 rounded-md ` + ((active == false) ? `text-black border-2 border-black bg-red-400 ` : `bg-red-500 hover:bg-red-600 text-white`)}
                >
                    Lezárt
                </button>
            </div>
            {votes && 
                votes
                .filter((vote) => ((!groupFilter && isThisSchool(vote.author.group_id)) ? true : (groupId == vote.author.group_id)))
                .filter((vote) => ((groupFilter) ? (vote.visibility == 'class') : (vote.visibility == 'school')))
                .filter((vote) => (active ? (compareAsc(new Date(), new Date(vote.deadline))) <= 0 : (compareAsc(new Date(), new Date(vote.deadline))) == 1)) != ""
                ?
                votes
                .filter((vote) => ((!groupFilter && isThisSchool(vote.author.group_id)) ? true : (groupId == vote.author.group_id)))
                .filter((vote) => ((groupFilter) ? (vote.visibility == 'class') : (vote.visibility == 'school')))
                .filter((vote) => (active ? (compareAsc(new Date(), new Date(vote.deadline))) <= 0 : (compareAsc(new Date(), new Date(vote.deadline))) == 1))
                .map((vote) => (
                    <div 
                        key={vote.id}
                        className="p-5 my-5 text-left border rounded-md shadow-sm"
                    >
                        <p className="mb-3 font-bold">{vote.question}</p>

                        <p className="text-sm ml-2 mb-3">Határidő: {format(vote.deadline, "yyyy.MM.dd H:mm")}</p>

                        <div className="space-x-3 space-y-3 text-right">
                            {active && <Link
                                href={route('votes.show', vote.id)}
                                className={`px-4 py-2 text-white bg-${color}-500 rounded-md hover:bg-${color}-600`}
                            >
                                Szavazok
                            </Link>}
                            {!active && <Link
                                href={route('votes.show', vote.id)}
                                className={`px-4 py-2 text-white bg-${color}-500 rounded-md hover:bg-${color}-600`}
                            >
                                Eredmények megtekintése
                            </Link>}
                            {user.id === vote.author_id && active && <Link
                                href={route('votes.edit', vote.id)}
                                className={`px-4 py-2 text-white bg-${color}-500 rounded-md hover:bg-${color}-600`}
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
                    </div>
                ))
                :
                <h1 className='font-bold m-2 p-2'>Nincsenek megjeleníthető szavazások!</h1>
            }
        </div>
    );
}
