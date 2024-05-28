import { format, addDays } from 'date-fns';
import { Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Posts({ user, posts, pastPosts, topic, groupId, schoolId, groupFilter, groups }) {
    const [date, setDate] = useState();
    const [week, setWeek] = useState(true);
    const [past, setPast] = useState('all');
    const [dif, setDif] = useState(0);
    const [subject, setSubject] = useState('');
    const [search, setSearch] = useState();
    const [emptyDays, setEmptyDays] = useState(0);

    function deletePost(id) {
        router.delete(route('posts.destroy', id), id);
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

    function selectColor(topic) {
        return topic === 'learn' ? 'blue' : (topic === 'help' ? 'red' : (topic === 'event' ? 'green' : (topic === 'parent' ? 'orange' : ( topic === 'calendar' ? 'teal' : 'purple'))));
    }
    let color = selectColor(topic);

    function getSubject(c){
        return c === 'm' ? 'Matek' : (c === 'g' ? 'Magyar' : (c === 'h' ? 'Történelem' : (c === 'l' ? 'Idegen nyelv' : ( c === 's' ? 'Természettudomány' : ( c === 'o' ? 'Egyéb' : 'Összes')))));
    }

    function getMonday(){
        let curr = addDays(new Date, dif*7);
        let first = curr.getDate() - curr.getDay();
        let firstday = new Date(curr.setDate(first+1));
        return format(firstday, 'yyyy-MM-dd');
    }

    const daysOfWeek = ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat', 'Vasárnap'];
    const allPosts = pastPosts ? pastPosts.concat(posts) : undefined;

    if(week && topic === 'calendar'){
        return (
            <div>
                <div className='flex justify-between'>
                    <button
                        onClick={() => {setWeek(false)}}
                        className={`px-4 py-2 text-white bg-${color}-500 rounded-md hover:bg-${color}-600 mb-2`}
                    >
                        Lista nézet
                    </button>
                    <div className='flex-initial space-x-2'>
                        <button
                            onClick={() => {setDif(dif-1);setEmptyDays(0)}}
                            className={`px-4 py-2 text-white bg-${color}-500 rounded-md hover:bg-${color}-600 mb-2`}
                        >
                            &lt;
                        </button>
                        <button
                            onClick={() => {setDif(dif+1);setEmptyDays(0)}}
                            className={`px-4 py-2 text-white bg-${color}-500 rounded-md hover:bg-${color}-600 mb-2`}
                        >
                            &gt;
                        </button>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="flex flex-row overflow-auto rounded-md">
                        {daysOfWeek.map((day, index) => (
                            <div  key={index} className="flex-1 border border-gray-300 pb-10">
                                <div className={`flex-1 text-center text-white bg-${color}-500 border-gray-300 pt-2`}>{day}</div>
                                <div className={`flex-1 text-center text-white bg-${color}-500 border-b border-gray-300 p-2`}>{format(addDays(getMonday(), index), 'MM/dd')}</div>
                                <div key={index} className="flex-1 p-2">
                                    {allPosts && allPosts
                                        .filter((post) => (topic !== 'learn' ? (!groupFilter && post.user && isThisSchool(post.user.group_id)) ? true : post.user && (groupId == post.user.group_id) : true))
                                        .filter((post) => (topic !== 'learn' ? (groupFilter) ? (post.visibility == 'class') : (post.visibility == 'school') : true))            
                                        .filter(post => post.date === (format(addDays(getMonday(), index), 'yyyy-MM-dd'))) == ""
                                        ?
                                        emptyDays == index ? setEmptyDays(emptyDays + 1) : ""
                                        :
                                        allPosts
                                        .filter((post) => (topic !== 'learn' ? (!groupFilter && post.user && isThisSchool(post.user.group_id)) ? true : post.user && (groupId == post.user.group_id) : true))
                                        .filter((post) => (topic !== 'learn' ? (groupFilter) ? (post.visibility == 'class') : (post.visibility == 'school') : true))            
                                        .filter(post => post.date === (format(addDays(getMonday(), index), 'yyyy-MM-dd')))
                                        .map((post, postIndex) => (
                                            <div key={postIndex} className='border-b pb-2 mt-2 mb-2 border-gray-500'>
                                                <Link className="text-sm" href={route('posts.show', post.id)} >{post.title}</Link>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                        {emptyDays == 7 && <div className='flex-1 text-center bg-teal-500 text-white border border-gray-300'>A héten nincsenek események!</div>}
                </div>
            </div>
        );
    }
    return (
        <div>
            {topic === 'calendar' && <div><div className='space-x-3 space-y-3 flex justify-between'>
                <div className='space-x-3 space-y-3'>
                    <button
                        href='#'
                        onClick={() => {setPast('all');setDate(null)}}
                        disabled={ past == 'all' ? true : false }
                        className={`px-4 py-2 rounded-md bg-${color}-500 hover:bg-${color}-600 `  + (past == 'all' ? `text-black border-2 border-black` : `text-white`)}
                    >
                        Összes
                    </button>
                    <button
                        onClick={() => {setPast('future')}}
                        disabled={ past == 'future' ? true : false }
                        className={`px-4 py-2 rounded-md bg-${color}-500 hover:bg-${color}-600 `  + (past == 'future' ? `text-black border-2 border-black` : `text-white`)}
                        >
                        Jövőbeli események
                    </button>
                    <button
                        onClick={() => {setPast('past')}}
                        disabled={ past == 'past' ? true : false }
                        className={`px-4 py-2 rounded-md bg-${color}-500 hover:bg-${color}-600 `  + (past == 'past' ? `text-black border-2 border-black` : `text-white`)}
                        >
                        Múltbeli események
                    </button>
                    {past!='all' && <input className='border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' name='datePicker' type="date" id="datePicker" min={past === 'future' ? format(new Date(), 'yyyy-MM-dd') : ""} max={past === 'past' ? format(new Date(), 'yyyy-MM-dd') : ""} value={date} onChange={(e) => setDate(e.target.value)} />}
                </div>
                <div>
                    <button
                        onClick={() => {setWeek(true)}}
                        className={`px-4 py-2 text-white bg-${color}-500 rounded-md hover:bg-${color}-600`}
                    >
                        Heti események
                    </button>
                </div>
            </div>
            {date && <div className='mt-2 space-x-3 space-y-3'>
                <h1 className="font-bold">{date}</h1>
            </div>}
            </div>}
            {topic === 'learn' && <div className='space-x-3 space-y-3'>
                <div className='flex justify-center'>                    
                    <input 
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder='Keresés...'
                        className={`block w-full rounded-md border-0 p-1.5 text-${color}-900 shadow-sm ring-1 ring-inset w-3/6`}
                    />
                </div>
                <p>Téma választás:</p>
                <button
                    value={null}
                    onClick={(e) => setSubject(e.target.value)}
                    disabled={ subject == '' ? true : false }
                    className={`px-2 py-1 rounded-md bg-blue-500 hover:bg-blue-600 ` + (subject == '' ? `text-black border-2 border-black` : `text-white`) }
                >
                    Összes
                </button>
                <button
                    value='m'
                    onClick={(e) => setSubject(e.target.value)}
                    disabled={ subject == 'm' ? true : false }
                    className={`px-2 py-1 rounded-md bg-red-500 hover:bg-red-600 ` + (subject == 'm' ? `text-black border-2 border-black` : `text-white`) }
                >
                    Matek
                </button>
                <button
                    value='g'
                    onClick={(e) => setSubject(e.target.value)}
                    disabled={ subject == 'g' ? true : false }
                    className={`px-2 py-1 rounded-md bg-green-500 hover:bg-green-600 ` + (subject == 'g' ? `text-black border-2 border-black` : `text-white`) }
                >
                    Magyar
                </button>
                <button
                    value='h'
                    onClick={(e) => setSubject(e.target.value)}
                    disabled={ subject == 'h' ? true : false }
                    className={`px-2 py-1 rounded-md bg-orange-500 hover:bg-orange-600 ` + (subject == 'h' ? `text-black border-2 border-black` : `text-white`) }
                >
                    Történelem
                </button>
                <button
                    value='l'
                    onClick={(e) => setSubject(e.target.value)}
                    disabled={ subject == 'e' ? true : false }
                    className={`px-2 py-1 rounded-md bg-teal-500 hover:bg-teal-600 ` + (subject == 'l' ? `text-black border-2 border-black` : `text-white`) }
                >
                    Idegen nyelv
                </button>
                <button
                    value='s'
                    onClick={(e) => setSubject(e.target.value)}
                    disabled={ subject == 's' ? true : false }
                    className={`px-2 py-1 rounded-md bg-yellow-500 hover:bg-yellow-600 ` + (subject == 's' ? `text-black border-2 border-black` : `text-white`) }
                >
                    Természettudomány
                </button>
                <button
                    value='o'
                    onClick={(e) => setSubject(e.target.value)}
                    disabled={ subject == 'o' ? true : false }
                    className={`px-2 py-1 rounded-md bg-gray-500 hover:bg-gray-600 ` + (subject == 'o' ? `text-black border-2 border-black` : `text-white`) }
                >
                    Egyéb
                </button>
                {subject && <div className='space-x-3 space-y-3'>
                    <h1 className="font-bold">{getSubject(subject)}</h1>
                </div>}
            </div>}
            {past !== 'future' && pastPosts && (
                pastPosts
                .filter((post) => (topic !== 'learn' ? (!groupFilter && post.user && isThisSchool(post.user.group_id)) ? true : post.user && (groupId == post.user.group_id) : true))
                .filter((post) => (topic !== 'learn' ? (groupFilter) ? (post.visibility == 'class') : (post.visibility == 'school') : true))
                .filter((post) => ((date && past !== 'future') ? date == post.date : true)) != ""
                ?
                pastPosts
                .filter((post) => (topic !== 'learn' ? (!groupFilter && post.user && isThisSchool(post.user.group_id)) ? true : post.user && (groupId == post.user.group_id) : true))
                .filter((post) => (topic !== 'learn' ? (groupFilter) ? (post.visibility == 'class') : (post.visibility == 'school') : true))
                .filter((post) => ((date && past !== 'future') ? date == post.date : true))
                .map((post) => (
                    <div 
                        key={post.id}
                        className="p-5 my-5 text-left border rounded-md shadow-sm"
                    >
                        {!date && <h1 className="font-bold">{format(post.date, "yyyy.MM.dd")}</h1>}
                        <p className="font-bold">{post.title}</p>

                        <div className="space-x-3 space-y-3 text-right mt-2">
                            <Link
                                href={route('posts.show', post.id)}
                                className={`px-4 py-2 text-white bg-${color}-500 rounded-md hover:bg-${color}-600`}
                            >
                                Megtekintés
                            </Link>
                            {user.id === post.user_id && <Link
                                href={route('posts.edit', post.id)}
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
                    </div>
                ))
                :
                <div>
                    {past != 'all' && <h1 className='font-bold m-2 p-2'>Nincsenek múltbeli események!</h1>}
                </div>
                )
            }
            {past !== 'past' && posts && (
                posts
                .filter((post) => (topic !== 'learn' ? (!groupFilter && post.user && isThisSchool(post.user.group_id)) ? true : post.user && (groupId == post.user.group_id) : true))
                .filter((post) => (topic !== 'learn' ? (groupFilter) ? (post.visibility == 'class') : (post.visibility == 'school') : true))
                .filter((post) => (topic === 'learn' ? search ? (post.title.includes(search) || post.description.includes(search) || post.user ? post.user.name.includes(search) : false) ? true : false : true : true))
                .filter((post) => ((date && past !== 'past') ? date == post.date : true))
                .filter((post) => (subject ? subject == post.subject : true)) != ""
                ?
                posts
                .filter((post) => (topic !== 'learn' ? (!groupFilter && post.user && isThisSchool(post.user.group_id)) ? true : post.user && (groupId == post.user.group_id) : true))
                .filter((post) => (topic !== 'learn' ? (groupFilter) ? (post.visibility == 'class') : (post.visibility == 'school') : true))
                .filter((post) => (topic === 'learn' ? search ? (post.title.includes(search) || post.description.includes(search) || post.user ? post.user.name.includes(search) : false) ? true : false : true : true))
                .filter((post) => ((date && past !== 'past') ? date == post.date : true))
                .filter((post) => (subject ? subject == post.subject : true))
                .map((post) => (
                    <div 
                        key={post.id}
                        className="p-5 my-5 text-left border rounded-md shadow-sm"
                    >
                        {!date && post.date && <h1 className="font-bold">{format(post.date, "yyyy.MM.dd")}</h1>}
                        <p className="font-bold">{post.title}</p>

                        {topic !== 'calendar' && <p className="text-sm ml-2">{post.user ? post.user.name : 'Deleted User'} - {format(post.updated_at, "yyyy.MM.dd H:mm")}</p>}

                        {topic === 'learn' && <p className="mt-2 mb-2">{getSubject(post.subject)}</p>}
                        
                        {topic !== 'calendar' && <p className="mb-3">{post.description}</p>}

                        <div className="space-x-3 space-y-3 text-right mt-2">
                            <Link
                                href={route('posts.show', post.id)}
                                className={`px-4 py-2 text-white bg-${color}-500 rounded-md hover:bg-${color}-600`}
                            >
                                Megtekintés
                            </Link>
                            {user.id === post.user_id && <Link
                                href={route('posts.edit', post.id)}
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
                    </div>
                ))
                :
                <h1 className='font-bold m-2 p-2'>Nincsenek megjeleníthető bejegyzések!</h1>
            )
            }
        </div>
    );
}
