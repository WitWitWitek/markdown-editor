import MarkdownOutput from '../components/MarkdownOutput/MarkdownOutput';
import MarkdownForm from '../components/MarkdownForm/MarkdownForm';
import Navigation from '../components/Navigation/Navigation';
import Notifications from '../components/Notifications/Notifications';

export default function Home() {
  return (
    <div className='markdown__container'>
        <Navigation />
        <MarkdownForm />
        <MarkdownOutput />
        <Notifications />
    </div>
  )
}