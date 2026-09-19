<?php

declare(strict_types=1);

final class Seed
{
    public static function run(): void
    {
        $pdo = Database::pdo();
        $exists = (int) $pdo->query('SELECT COUNT(*) FROM settings')->fetchColumn();
        if ($exists > 0) {
            return;
        }

        $img = static fn (string $file) => '/images/' . $file . '.png';

        $settings = [
            'studio_name' => 'GIGIOR',
            'descriptor' => 'SALON · AESTHETIC',
            'tagline' => 'Hair and skin, held to one standard.',
            'support' => 'Consultation-led salon and aesthetic work — composed, never hurried.',
            'phone' => '+00 000 000 0000',
            'whatsapp' => '+000000000000',
            'email' => 'house@gigior.local',
            'instagram' => 'https://instagram.com/gigior',
            'rating' => '4.9',
            'review_count' => '320',
            'years' => '8',
            'locations_count' => '1',
            'practitioners_count' => '12',
            'disclaimer' => 'Results vary by individual. Consent on file for all imagery.',
        ];
        $st = $pdo->prepare('INSERT INTO settings (key, value) VALUES (?, ?)');
        foreach ($settings as $k => $v) {
            $st->execute([$k, $v]);
        }

        $services = [
            ['salon', 'hair', 'signature-cut', 'Signature cut & finish', 'A line that holds beyond the blow-dry.', 'Cut and finish composed for your bone structure.', 'Consultation, cut, and a considered finish in daylight.', 'from 60 min', 85, 'From 85', 'direct', $img('svc-cut'), 1],
            ['salon', 'hair', 'colour', 'GIGIOR colour', 'Lived-in colour mixed for your light.', 'Dimension without a harsh line.', 'Gloss, balayage, and corrective colour mixed in daylight — never copied from a screen.', 'from 2 hrs', 160, 'From 160', 'direct', $img('svc-colour'), 2],
            ['salon', 'hair', 'hair-treatments', 'Hair treatments', 'Strength and movement restored to the fibre.', 'Repair without weighing the hair down.', 'Bond and moisture rituals chosen after a strand assessment.', 'from 45 min', 70, 'From 70', 'direct', $img('svc-treatments'), 3],
            ['salon', 'hair', 'styling', 'Styling', 'A finish for the evening — or the Tuesday.', 'Blow-dry, set, or dressed hair.', 'Editorial or quiet. Built to last the day you actually have.', '45 min', 55, 'From 55', 'direct', $img('svc-styling'), 4],
            ['salon', 'makeup', 'makeup', 'Makeup', 'Skin-led makeup for daylight and night.', 'Your features, not a trend overlay.', 'Consultation, skin prep, and a finish that photographs honestly.', 'from 60 min', 90, 'From 90', 'direct', $img('svc-makeup'), 5],
            ['salon', 'nails', 'nails', 'Nails', 'Clean shape, quiet colour.', 'Hands that look considered, not costumed.', 'Manicure, pedicure, and lasting colour — no novelty walls.', 'from 45 min', 45, 'From 45', 'direct', $img('svc-nails'), 6],
            ['salon', 'bridal', 'bridal', 'Bridal & occasion', 'Trials first. The day, unhurried.', 'Hair and makeup that hold through the hours.', 'A trial, a plan, and day-of attendance in the house or on location.', 'by arrangement', 220, 'Trials from 220', 'direct', $img('svc-bridal'), 7],
            ['salon', 'grooming', 'grooming', 'Grooming', 'Cut, beard, and skin — one chair.', 'Precise, quiet grooming.', 'Men’s cut, beard, and a simple skin finish.', 'from 45 min', 50, 'From 50', 'direct', $img('svc-grooming'), 8],
            ['aesthetics', 'skin', 'ritual-facial', 'Ritual facial', 'A diagnostic hour, not a spa menu.', 'Skin that behaves better after, not just pinker.', 'Analysis, treatment, massage, finish — products chosen in the room.', '75 min', 140, 'From 140', 'either', $img('svc-ritual'), 10],
            ['aesthetics', 'skin', 'acne-plan', 'Acne plan', 'Congestion treated as a course, not a one-off.', 'Fewer breakouts, calmer barrier.', 'A staged plan: consultation, in-room work, and a home cadence.', 'course', null, 'Quoted at consultation', 'consultation', $img('svc-acne'), 11],
            ['aesthetics', 'skin', 'pigmentation', 'Pigmentation', 'Evenness, without stripping the barrier.', 'Softer contrast in tone over a measured course.', 'Peels, light, or topical plans — only after a consult.', 'course', null, 'Quoted at consultation', 'consultation', $img('svc-pigment'), 12],
            ['aesthetics', 'skin', 'rejuvenation', 'Skin rejuvenation', 'Texture and dew, built over sessions.', 'Skin that looks like rest.', 'Needling, boosters, or medical facials as indicated.', 'from 60 min', null, 'Quoted at consultation', 'consultation', $img('svc-rejuvenation'), 13],
            ['aesthetics', 'injectables', 'expression-lines', 'Expression lines', 'Movement softened. Character kept.', 'A conservative, prescriber-led approach.', 'Consultation required. Prescription anti-wrinkle treatment only where indicated.', 'consult + treatment', null, 'Quoted at consultation', 'consultation', $img('svc-expression'), 14],
            ['aesthetics', 'injectables', 'facial-balancing', 'Facial balancing', 'Proportion, not a trend.', 'Volume only where it serves the face you have.', 'Hyaluronic acid, or a decision against it — after daylight examination.', 'consult', null, 'Quoted at consultation', 'consultation', $img('svc-balancing'), 15],
            ['aesthetics', 'laser', 'laser', 'Laser', 'Hair and tone, with named devices.', 'Fewer sessions when the device and the skin match.', 'Laser hair and pigment work by certified operators. Consult first.', 'from 20 min', null, 'Quoted at consultation', 'consultation', $img('svc-laser'), 16],
            ['aesthetics', 'hair-restoration', 'hair-restoration', 'Hair restoration', 'Density as a plan, not a promise.', 'A medical conversation about what is possible.', 'PRP or medical plans after assessment. Results vary.', 'consult', null, 'Quoted at consultation', 'consultation', $img('svc-restoration'), 17],
            ['aesthetics', 'body', 'body', 'Body', 'Contour and skin quality, conservatively.', 'Body work only when it is indicated.', 'Consultation-led body treatments. Face remains our centre.', 'consult', null, 'Quoted at consultation', 'consultation', $img('svc-body'), 18],
        ];

        $extraBase = [
            'who' => ['You want a considered change, not a costume', 'You prefer daylight and an honest consult', 'You can keep a simple cadence at home'],
            'benefits' => ['A plan before any product or needle', 'Work composed for your canvas', 'Aftercare you can actually follow', 'The same faces on return visits'],
            'process' => ['Arrive 10 minutes early', 'Consultation in daylight', 'The work itself', 'Aftercare and a return window'],
            'results' => 'Changes are usually visible in the days and weeks after — not overnight, and not identical for every guest.',
            'facts' => ['Downtime varies', 'Sessions as advised', 'Patch tests where relevant'],
            'contra' => 'Active infection, sunburn, pregnancy for some treatments, and anything listed at consultation. We will not treat against our judgement.',
            'faqs' => [
                ['q' => 'Will it hurt?', 'a' => 'Sensation varies. We will tell you what to expect before we begin — never as a surprise.'],
                ['q' => 'How many sessions?', 'a' => 'Some salon work is once. Skin and aesthetic plans are often a course. You will leave with a number, not a mystery.'],
                ['q' => 'Can I book treatment today?', 'a' => 'Hair and rituals can often be reserved. Prescription aesthetics begin with a consultation.'],
                ['q' => 'Do you guarantee results?', 'a' => 'No. We speak in ranges. If a look would not be you, we will say so.'],
                ['q' => 'Who performs this?', 'a' => 'Named practitioners. Juniors are not rotated onto your work without your knowledge.'],
            ],
        ];

        $ins = $pdo->prepare('INSERT INTO services (pillar, category, slug, name, short_line, benefit, overview, duration_label, price_from, price_label, booking_mode, image, sort, extra) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)');
        foreach ($services as $s) {
            $ins->execute([...$s, json_encode($extraBase)]);
        }

        $people = [
            ['anya-mehta', 'Anya Mehta', 'Hair director', 'Cut, colour, bridal', 'Senior colour & form', 14, 'Anya holds the hair book. Lived-in colour, geometry, and bridal trials.', $img('p-anya'), null],
            ['rahul-sen', 'Rahul Sen', 'Colourist', 'GIGIOR colour, correction', 'Advanced colour', 9, 'Rahul mixes in daylight. Corrective work is quoted, never rushed.', $img('p-rahul'), null],
            ['leila-rahman', 'Dr Leila Rahman', 'Aesthetic practitioner', 'Skin quality, injectables', 'Medical aesthetics', 11, 'Consultation-led facial work. Conservative. Named prescriber where required.', $img('p-leila'), 'Prescriber on the register — number confirmed in the rooms.'],
            ['mira-kapoor', 'Mira Kapoor', 'Skin therapist', 'Rituals, acne, barrier', 'Skin analysis', 8, 'Mira reads the barrier before any device or peel is discussed.', $img('p-mira'), null],
        ];
        $pi = $pdo->prepare('INSERT INTO practitioners (slug, name, role, specialisation, qualifications, years, bio, image, register_line, sort) VALUES (?,?,?,?,?,?,?,?,?,?)');
        foreach ($people as $i => $p) {
            $pi->execute([...$p, $i + 1]);
        }

        $results = [
            ['GIGIOR colour', 'Hair', 'salon', 'Warmth kept through the ends. No heavy root.', 'One session', 'Anya Mehta', $img('ba-colour-before'), $img('ba-colour-after'), 'A., consented'],
            ['Signature cut', 'Hair', 'salon', 'A line that moves. Length kept.', 'One session', 'Anya Mehta', $img('ba-cut-before'), $img('ba-cut-after'), 'N., consented'],
            ['Ritual facial', 'Skin', 'aesthetics', 'Barrier calmer. Less redness at week two.', '3 sessions', 'Mira Kapoor', $img('ba-facial-before'), $img('ba-facial-after'), 'S., consented'],
            ['Pigmentation', 'Pigmentation', 'aesthetics', 'Softer contrast across the cheek. Course still running.', '4 sessions', 'Dr Leila Rahman', $img('ba-pigment-before'), $img('ba-pigment-after'), 'R., consented'],
            ['Expression lines', 'Ageing', 'aesthetics', 'Movement kept. Forehead quieter at rest.', '14 days after', 'Dr Leila Rahman', $img('ba-lines-before'), $img('ba-lines-after'), 'M., consented'],
            ['Bridal', 'Bridal Prep', 'salon', 'Hair that held through the day.', 'Trial + day', 'Anya Mehta', $img('ba-bridal-before'), $img('ba-bridal-after'), 'K., consented'],
        ];
        $ri = $pdo->prepare('INSERT INTO results (treatment, concern, pillar, description, timeline, practitioner, before_image, after_image, guest_label, consent, sort) VALUES (?,?,?,?,?,?,?,?,?,1,?)');
        foreach ($results as $i => $r) {
            $ri->execute([...$r, $i + 1]);
        }

        $quotes = [
            ['The colour still looks like me — just better in daylight.', 'Amina', 'The city', 'GIGIOR colour'],
            ['They refused a treatment I had asked for. That is why I stayed.', 'Leah', 'The city', 'Consultation'],
            ['A quiet room, a precise cut, no selling from the chair.', 'Noor', 'The city', 'Signature cut'],
            ['The consult was longer than the injection. That felt correct.', 'Priya', 'The city', 'Expression lines'],
        ];
        $qi = $pdo->prepare('INSERT INTO testimonials (quote, name, city, treatment, sort) VALUES (?,?,?,?,?)');
        foreach ($quotes as $i => $q) {
            $qi->execute([...$q, $i + 1]);
        }

        $pdo->prepare('INSERT INTO locations (slug, name, neighbourhood, address, hours, phone, whatsapp, email, image, parking, sort) VALUES (?,?,?,?,?,?,?,?,?,?,1)')
            ->execute([
                'the-house',
                'GIGIOR',
                'The house',
                '12 House Street, [City]',
                "Tuesday–Friday 10:00–19:00\nSaturday 09:00–17:00\nSunday–Monday closed",
                '+00 000 000 0000',
                '+000000000000',
                'house@gigior.local',
                $img('loc-house'),
                'Entrance by appointment. Limited street parking. A courtyard buzzer on arrival.',
            ]);

        $articles = [
            ['retinol-vs-peels', 'Retinol vs professional peels: what actually works', 'A plain comparison for anyone standing between a bottle and a booking.', 'Aesthetics is not a race to the strongest acid. Retinol at home and peels in the rooms do different jobs. We start with the barrier. If it is thin, we wait. If pigment sits deep, a peel course may be indicated — after a consult, never from a social caption.', 'Skin', $img('j-retinol')],
            ['lived-in-colour', 'Lived-in colour: why we will not copy the screenshot', 'Your canvas decides the result. A photograph is a starting point.', 'We can aim for the spirit of a reference. We cannot promise its hex code. Hair history, porosity, and your light in the room matter more than the save-folder.', 'Hair', $img('j-colour')],
            ['consultation-first', 'Why aesthetics at GIGIOR begins with a conversation', 'Treatment is not self-checked-out.', 'Prescription work needs a prescriber and a pause. Some guests are asked to start with a ritual instead. That is the standard, not a delay tactic.', 'Aesthetics', $img('j-consult')],
            ['bridal-timeline', 'A bridal timeline that does not panic the hair', 'Trials, pigment, and the two-week rule.', 'Major colour changes close to the day are often refused. We would rather hold the hair than gamble it. Book the trial early.', 'Bridal', $img('j-bridal')],
        ];
        $ai = $pdo->prepare('INSERT INTO articles (slug, title, excerpt, body, category, image, published_at) VALUES (?,?,?,?,?,?,?)');
        foreach ($articles as $i => $a) {
            $ai->execute([...$a, date('Y-m-d', strtotime('-' . ($i + 1) . ' weeks'))]);
        }

        $mem = [
            ['House', 'Your ongoing skin cadence', 'By arrangement', json_encode(['Priority booking', 'Named practitioner', 'Quarterly skin review', 'Home-care edit twice a year'])],
            ['Bridal journey', 'From trial to the last guest leaving', 'Quoted', json_encode(['Hair and makeup trials', 'Day-of team', 'Party hair add-on by arrangement'])],
            ['Colour keep', 'Gloss and trim, kept in rhythm', 'From 4 visits', json_encode(['Scheduled gloss', 'Trim included as advised', 'Same colourist'])],
        ];
        $mi = $pdo->prepare('INSERT INTO memberships (name, tagline, price_label, perks, sort) VALUES (?,?,?,?,?)');
        foreach ($mem as $i => $m) {
            $mi->execute([...$m, $i + 1]);
        }
    }
}
