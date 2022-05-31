<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

/**
 * @method static static OptionOne()
 * @method static static OptionTwo()
 * @method static static OptionThree()
 */
final class PermissionType extends Enum
{
    const GUEST =       'GUEST';
    const MAINTAINER =  'MAINTAINER';
    const ADMIN =       'ADMIN';
}
