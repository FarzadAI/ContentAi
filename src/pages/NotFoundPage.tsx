import { Link } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader/PageHeader';
import { ROUTES } from '../routes';
import page from './pages.module.css';

export default function NotFoundPage() {
  return (
    <div className={page.page}>
      <PageHeader
        eyebrow="۴۰۴"
        title="این صفحه پیدا نشد"
        lead="یا آدرس اشتباه است، یا چیزی که دنبالش بودی هنوز ساخته نشده. هر دو حالت، از اینجا ادامه بده."
      />

      <p className={page.count}>
        <Link to={ROUTES.discover}>برو به کشف</Link> · <Link to={ROUTES.courses}>دیدن دوره‌ها</Link>
      </p>
    </div>
  );
}
