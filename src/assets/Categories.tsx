import { useTranslation } from 'react-i18next';
export default function Categories() {
	const { t } = useTranslation();
	return [
		{
			category: t('t-material'),
			subcategories: [
				t('t-donation'),
				t('t-lending'),
				t('t-daily-tasks'),
				t('t-other'),
			],
		},
		{
			category: t('t-education'),
			subcategories: [
				t('t-academic-tutoring'),
				t('t-homework'),
				t('t-language-learning'),
				t('t-study-materials'),
				t('t-books'),
				t('t-other'),
			],
		},
		{
			category: t('t-career'),
			subcategories: [
				t('t-professional-mentoring'),
				t('t-cv-review'),
				t('t-job-search'),
				t('t-job-interview'),
				t('t-other'),
			],
		},
		{
			category: t('t-service'),
			subcategories: [
				t('t-beauty'),
				t('t-transportation'),
				t('t-legal'),
				t('t-accounting'),
				t('t-delivery'),
				t('t-other'),
			],
		},
		{
			category: t('t-emotion'),
			subcategories: [t('t-active-listening'), t('t-sharing-ex'), t('t-other')],
		},
		{
			category: t('t-technology'),
			subcategories: [
				t('t-devices'),
				t('t-tech-tutorial'),
				t('t-tech-support'),
				t('t-tech-training'),
				t('t-tech-consulting'),
				t('t-tech-development'),
				t('t-tech-design'),
				t('t-tech-project'),
				t('t-tech-research'),
				t('t-tech-analysis'),
				t('t-other'),
			],
		},
		{
			category: t('t-community'),
			subcategories: [
				t('t-neighborhood-cleaning'),
				t('t-beautification'),
				t('t-event'),
				t('t-other'),
			],
		},
		{
			category: t('t-food'),
			subcategories: [t('t-donation'), t('t-cmp'), t('t-other')],
		},
		{
			category: t('t-health'),
			subcategories: [
				t('t-health-advice'),
				t('t-health-checkup'),
				t('t-diet'),
				t('t-accompany'),
				t('t-other'),
			],
		},
		{
			category: t('t-elderly'),
			subcategories: [
				t('t-companion'),
				t('t-errand'),
				t('t-household'),
				t('t-other'),
			],
		},
		{
			category: t('t-family'),
			subcategories: [
				t('t-cleaning'),
				t('t-housekeeping'),
				t('t-babysitting'),
				t('t-house-rental'),
				t('t-house-maintenance'),
				t('t-house-repair'),
				t('t-house-electricity'),
				t('t-other'),
			],
		},
		{
			category: t('t-animal'),
			subcategories: [
				t('t-petsitting'),
				t('t-veterinary'),
				t('t-adoption'),
				t('t-foster'),
				t('t-other'),
			],
		},
	];
}
