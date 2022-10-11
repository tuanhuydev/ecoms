<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

/**
 * @method static static OptionOne()
 * @method static static OptionTwo()
 * @method static static OptionThree()
 */
final class AccountAvailabilityType extends Enum
{
    const AVAILABLE = 'AVAILABLE';
    const AWAY = 'AWAY';
    const BUSY = 'BUSY';
    const OFFLINE = 'OFFLINE';

}
