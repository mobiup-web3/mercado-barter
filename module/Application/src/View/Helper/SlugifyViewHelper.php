<?php declare(strict_types=1);

namespace Application\View\Helper;

use Slug\Slugifier;
use Laminas\View\Helper\AbstractHelper;

/**
 * Class SlugifyViewHelper
 * @package Application\View\Helper
 */
class SlugifyViewHelper extends AbstractHelper
{
    /**
     * @param $string
     * @return string
     */
    public function __invoke($string): string
    {
        return $this->slugify($string);
    }

    /**
     * @param $string
     * @return string
     */
    public function slugify($string): string
    {
        $slugifier = new Slugifier();
        $slugifier->setTransliterate(true);
        $slugifier->setDelimiter('-');

        return (string)$slugifier->slugify($string);
    }
}
